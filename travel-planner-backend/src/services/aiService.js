import axios from 'axios';
import { config } from '../config/env.js';
import { buildTravelPrompt } from './promptService.js';
import { logger } from '../utils/logger.js';

export const generateItinerary = async (tripData) => {
  try {
    logger.info('AI Service received trip data:', {
      destination: tripData.destination,
      budget: tripData.budget,
      travelers: tripData.numberOfTravelers,
      preferences: tripData.preferences,
      constraints: tripData.constraints,
    });

    const { systemPrompt, userPrompt } = buildTravelPrompt(tripData);
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

    // ✅ Clean markdown code blocks - using String.fromCharCode to avoid backtick issues
    const BACKTICK = String.fromCharCode(96);
    const CODE_BLOCK = BACKTICK + BACKTICK + BACKTICK;
    const JSON_CODE_BLOCK = CODE_BLOCK + 'json';
    
    let cleanedContent = aiContent.trim();
    
    // Remove ```
    if (cleanedContent.startsWith(JSON_CODE_BLOCK)) {
      const firstNewline = cleanedContent.indexOf('\n');
      if (firstNewline !== -1) {
        cleanedContent = cleanedContent.substring(firstNewline + 1);
      }
    } 
    // Remove ``` at start
    else if (cleanedContent.startsWith(CODE_BLOCK)) {
      cleanedContent = cleanedContent.substring(3);
    }
    
    cleanedContent = cleanedContent.trim();
    
    // Remove ```
    if (cleanedContent.endsWith(CODE_BLOCK)) {
      cleanedContent = cleanedContent.substring(0, cleanedContent.length - 3);
    }
    
    cleanedContent = cleanedContent.trim();

    logger.debug('Cleaned content starts with:', cleanedContent.substring(0, 50));

    let parsedItinerary;
    try {
      parsedItinerary = JSON.parse(cleanedContent);
      logger.success('✅ JSON parsed successfully');
    } catch (parseError) {
      logger.error('Failed to parse AI response:', parseError.message);
      
      const salvaged = attemptJSONSalvage(cleanedContent);
      if (salvaged) {
        logger.warn('⚠️ Used salvaged JSON response');
        parsedItinerary = salvaged;
      } else {
        logger.error('Cleaned content preview:', cleanedContent.substring(0, 300));
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
    const BACKTICK = String.fromCharCode(96);
    const CODE_BLOCK = BACKTICK + BACKTICK + BACKTICK;
    const JSON_CODE_BLOCK = CODE_BLOCK + 'json';
    
    let fixed = incompleteJSON.trim();
    
    // Remove ```json at start
    if (fixed.startsWith(JSON_CODE_BLOCK)) {
      const firstNewline = fixed.indexOf('\n');
      if (firstNewline !== -1) {
        fixed = fixed.substring(firstNewline + 1);
      }
    } 
    // Remove ```
    else if (fixed.startsWith(CODE_BLOCK)) {
      fixed = fixed.substring(3);
    }
    
    fixed = fixed.trim();
    
    // Remove ``` at end
    if (fixed.endsWith(CODE_BLOCK)) {
      fixed = fixed.substring(0, fixed.length - 3);
    }
    
    fixed = fixed.trim();
    
    // Remove trailing commas
    fixed = fixed.replace(/,(\s*[}\]])/g, '$1');

    const openBraces = (fixed.match(/{/g) || []).length;
    const closeBraces = (fixed.match(/}/g) || []).length;
    const openBrackets = (fixed.match(/\[/g) || []).length;
    const closeBrackets = (fixed.match(/]/g) || []).length;

    if (!['}', ']', '"'].includes(fixed.trim().slice(-1))) {
      const lastColon = fixed.lastIndexOf(':');
      const lastComma = fixed.lastIndexOf(',');
      
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
