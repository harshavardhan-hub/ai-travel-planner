import axios from 'axios';
import { config } from '../config/env.js';
import { buildTravelPrompt } from './promptService.js';
import { logger } from '../utils/logger.js';

export const generateItinerary = async (tripData) => {
  try {
    // ✅ Log received trip data
    logger.info('AI Service received trip data:', {
      destination: tripData.destination,
      budget: tripData.budget,
      travelers: tripData.numberOfTravelers,
      preferences: tripData.preferences,
      constraints: tripData.constraints,
    });

    const { systemPrompt, userPrompt } = buildTravelPrompt(tripData);

    // ✅ Log a snippet of the prompt to verify it includes all details
    logger.debug('Prompt preview:', userPrompt.substring(0, 500) + '...');

    logger.info('🤖 Calling OpenRouter AI...');

    const response = await axios.post(
      config.openRouterApiUrl,
      {
        model: config.aiModel,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 8000,
      },
      {
        headers: {
          Authorization: `Bearer ${config.openRouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': config.clientUrl,
          'X-Title': 'AI Travel Planner',
        },
      }
    );

    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error('Invalid response from AI service');
    }

    const aiContent = response.data.choices[0].message.content;
    logger.success('✅ AI response received');

    let cleanedContent = aiContent.trim();
    cleanedContent = cleanedContent.replace(/``````\n?/g, '');
    cleanedContent = cleanedContent.trim();

    let parsedItinerary;
    try {
      parsedItinerary = JSON.parse(cleanedContent);
    } catch (parseError) {
      logger.error('Failed to parse AI response:', parseError.message);
      
      const salvaged = attemptJSONSalvage(cleanedContent);
      if (salvaged) {
        logger.warn('⚠️ Used salvaged JSON response');
        parsedItinerary = salvaged;
      } else {
        logger.error('Full AI Response:', cleanedContent);
        throw new Error('AI generated invalid JSON format. Please try again.');
      }
    }

    if (!parsedItinerary.days || !Array.isArray(parsedItinerary.days)) {
      throw new Error('AI response missing required "days" array');
    }

    if (parsedItinerary.days.length === 0) {
      throw new Error('AI response has no days in the itinerary');
    }

    logger.success(`✅ Generated itinerary with ${parsedItinerary.days.length} days`);
    return parsedItinerary;

  } catch (error) {
    logger.error('AI Service Error:', error.message);

    if (error.response) {
      logger.error('AI API Response Error:', {
        status: error.response.status,
        data: error.response.data,
      });
      
      const errorMsg = error.response.data.error?.message || 'Unknown error';
      if (error.response.status === 402) {
        throw new Error('Insufficient OpenRouter credits. Please add more credits.');
      } else if (error.response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      } else {
        throw new Error(`AI API Error: ${errorMsg}`);
      }
    }

    throw new Error(error.message || 'Failed to generate itinerary');
  }
};

const attemptJSONSalvage = (incompleteJSON) => {
  try {
    let fixed = incompleteJSON.replace(/,(\s*[}\]])/g, '$1');
    
    const openBraces = (fixed.match(/{/g) || []).length;
    const closeBraces = (fixed.match(/}/g) || []).length;
    const openBrackets = (fixed.match(/\[/g) || []).length;
    const closeBrackets = (fixed.match(/]/g) || []).length;

    const lastQuote = fixed.lastIndexOf('"');
    const lastComma = fixed.lastIndexOf(',');
    const lastBrace = fixed.lastIndexOf('}');
    const lastBracket = fixed.lastIndexOf(']');
    
    if (!['}', ']', '"'].includes(fixed.trim().slice(-1))) {
      const lastColon = fixed.lastIndexOf(':');
      if (lastColon > lastComma) {
        fixed = fixed.substring(0, lastColon) + ': ""';
      }
    }

    for (let i = 0; i < openBrackets - closeBrackets; i++) {
      fixed += ']';
    }

    for (let i = 0; i < openBraces - closeBraces; i++) {
      fixed += '}';
    }

    const parsed = JSON.parse(fixed);
    
    if (parsed.days && Array.isArray(parsed.days) && parsed.days.length > 0) {
      return parsed;
    }
    
    return null;
  } catch (e) {
    return null;
  }
};

export default generateItinerary;
