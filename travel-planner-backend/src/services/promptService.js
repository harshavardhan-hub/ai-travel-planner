export const buildTravelPrompt = (tripData) => {
  const {
    destination,
    dateRange,
    duration,
    budget,
    numberOfTravelers,
    preferences,
    constraints,
  } = tripData;

  const startDate = new Date(dateRange.startDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const endDate = new Date(dateRange.endDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const systemPrompt = `You are an expert travel planner with deep knowledge of geography and efficient travel routing. Create REALISTIC, geographically logical itineraries that:
1. Group nearby attractions together on the same day
2. Minimize travel time between locations
3. Follow a logical geographic flow (don't zigzag across the city)
4. Account for actual travel times and distances
5. Respect the user's budget, preferences, and constraints STRICTLY

Your responses must be in valid JSON format only, with no additional text, markdown, or explanation outside the JSON structure.`;

  // Build detailed preference string
  let preferenceDetails = '';
  
  if (preferences?.travelStyle) {
    preferenceDetails += `\n- Travel Style: ${preferences.travelStyle.toUpperCase()} (${
      preferences.travelStyle === 'relaxed' ? 'Slow-paced, plenty of rest time, 2-3 activities per day' :
      preferences.travelStyle === 'balanced' ? 'Mix of activities and relaxation, 3-4 activities per day' :
      'Action-packed, thrilling experiences, 5+ activities per day'
    })`;
  }
  
  if (preferences?.pace) {
    preferenceDetails += `\n- Activity Pace: ${preferences.pace.toUpperCase()}`;
  }

  if (preferences?.activities?.length > 0) {
    preferenceDetails += `\n- Preferred Activities: ${preferences.activities.map(a => a.replace(/_/g, ' ')).join(', ')}`;
    preferenceDetails += `\n  ** PRIORITIZE these activity types in the itinerary **`;
  }

  if (preferences?.foodPreferences?.length > 0) {
    preferenceDetails += `\n- Food Requirements: ${preferences.foodPreferences.map(f => f.replace(/_/g, ' ')).join(', ')}`;
    preferenceDetails += `\n  ** ALL meal recommendations must respect these dietary requirements **`;
  }

  // Build constraints string
  let constraintDetails = '';
  
  if (constraints?.mustVisit?.length > 0) {
    constraintDetails += `\n- MUST VISIT (Required): ${constraints.mustVisit.join(', ')}`;
    constraintDetails += `\n  ** These places MUST be included in the itinerary **`;
  }

  if (constraints?.avoid?.length > 0) {
    constraintDetails += `\n- AVOID: ${constraints.avoid.join(', ')}`;
    constraintDetails += `\n  ** Do NOT include these in recommendations **`;
  }

  if (constraints?.specialNotes) {
    constraintDetails += `\n- Special Notes: ${constraints.specialNotes}`;
  }

  const userPrompt = `Create a ${duration}-day travel itinerary for ${destination}.

**CRITICAL REQUIREMENTS - FOLLOW STRICTLY:**

**Geographic Logic & Efficiency:**
- Group attractions by neighborhood/district/area
- Plan routes that flow logically (e.g., north to south, clockwise around city)
- Morning and afternoon activities should be in the SAME AREA or nearby
- Include realistic travel times between locations (15-30 min max within same day)
- Don't jump between distant parts of the city unnecessarily
- If visiting multiple districts, transition makes sense (e.g., Old Town → City Center → Waterfront)

**Trip Details:**
- Dates: ${startDate} to ${endDate}
- Number of Travelers: ${numberOfTravelers} person(s)
- Budget: ${budget.toUpperCase()} (${
  budget === 'budget' ? 'Cost-effective options, local transport, budget-friendly restaurants ($20-80/day)' :
  budget === 'moderate' ? 'Mid-range comfort, mix of public/private transport, good restaurants ($80-200/day)' :
  'Premium luxury experiences, private transport, fine dining ($200-500+/day)'
})

**User Preferences:**${preferenceDetails}
${constraintDetails ? `\n**Constraints:**${constraintDetails}` : ''}

**Realistic Timing Guidelines:**
- Morning activities: 2-4 hours maximum
- Afternoon activities: 3-5 hours maximum
- Evening activities: 2-3 hours maximum
- Include buffer time for meals, rest, and unexpected delays
- Account for attraction opening/closing times

**Response Format (STRICT JSON):**
{
  "overview": "Brief 2-sentence summary mentioning the travel style and geographic flow",
  "days": [
    {
      "day": 1,
      "date": "Month Day, Year",
      "title": "Exploring [Specific District/Area]",
      "morning": {
        "time": "9:00 AM - 12:00 PM",
        "activity": "Specific activity name",
        "location": "Exact address or landmark",
        "duration": "2-3 hours",
        "estimatedCost": "${budget === 'budget' ? '$15-30' : budget === 'moderate' ? '$30-60' : '$60-150'}",
        "notes": "Practical tip including best time to visit",
        "transportFromPrevious": "Walking distance / 10 min taxi"
      },
      "afternoon": {
        "time": "1:00 PM - 5:00 PM",
        "activity": "Activity NEAR morning location",
        "location": "Nearby location (max 15-20 min travel)",
        "duration": "3-4 hours",
        "estimatedCost": "${budget === 'budget' ? '$20-40' : budget === 'moderate' ? '$40-80' : '$80-200'}",
        "notes": "Why this follows logically from morning activity",
        "transportFromPrevious": "15 min walk / 5 min taxi"
      },
      "evening": {
        "time": "6:00 PM - 9:00 PM",
        "activity": "Dinner and evening activity in SAME AREA",
        "location": "Same district as afternoon",
        "duration": "2-3 hours",
        "estimatedCost": "${budget === 'budget' ? '$25-50' : budget === 'moderate' ? '$50-100' : '$100-300'}",
        "notes": "Atmosphere and why it's a good ending to the day"
      },
      "meals": {
        "breakfast": "Specific restaurant with cuisine type${preferences?.foodPreferences?.length > 0 ? ' (' + preferences.foodPreferences.join('/') + ')' : ''}",
        "lunch": "Restaurant in same area as morning/afternoon activities${preferences?.foodPreferences?.length > 0 ? ' (' + preferences.foodPreferences.join('/') + ')' : ''}",
        "dinner": "Restaurant matching evening location${preferences?.foodPreferences?.length > 0 ? ' (' + preferences.foodPreferences.join('/') + ')' : ''}"
      },
      "accommodation": "${budget === 'budget' ? 'Budget hotel/hostel in central area' : budget === 'moderate' ? 'Mid-range hotel near main attractions' : 'Luxury hotel in prime location'}",
      "transportation": "How to get around this day (walking, metro, taxi mix)",
      "dailyBudget": "$${budget === 'budget' ? '80-120' : budget === 'moderate' ? '150-250' : '300-500'}",
      "areaFocus": "Specific neighborhood/district covered today"
    }
  ],
  "totalEstimatedBudget": "$${duration * (budget === 'budget' ? 100 : budget === 'moderate' ? 200 : 400)}",
  "tips": [
    "Best times to avoid crowds at popular spots",
    "Local transport tips and passes",
    "Money-saving suggestions for ${budget} travelers",
    "Weather considerations and what to pack"
  ],
  "accommodation": "Overall ${budget} hotel recommendations centrally located for easy access to planned areas",
  "transportation": "Best transport options: ${budget === 'budget' ? 'public transport, walking, budget rideshares' : budget === 'moderate' ? 'mix of public transport and taxis' : 'private car/driver, premium options'}"
}

**GEOGRAPHIC EFFICIENCY RULES:**
1. Day 1: Focus on ONE main area/district
2. Day 2: Adjacent area or natural progression from Day 1
3. Each subsequent day: Logical geographic flow
4. Don't revisit same area unless necessary
5. Group must-visit places with nearby attractions
6. Travel time between morning→afternoon activities: MAX 20 minutes
7. Travel time between afternoon→evening: MAX 15 minutes

**MANDATORY QUALITY CHECKS:**
✓ All activities on same day are geographically clustered
✓ Travel times are realistic and included
✓ Budget matches ${budget} level throughout
✓ ${numberOfTravelers} traveler(s) considered in recommendations
✓ ${preferences?.activities?.length > 0 ? preferences.activities.join(', ') + ' activities prioritized' : 'Diverse activities included'}
✓ ${constraints?.mustVisit?.length > 0 ? 'Must-visit: ' + constraints.mustVisit.join(', ') + ' included' : 'Main attractions covered'}
✓ ${preferences?.foodPreferences?.length > 0 ? 'All meals are ' + preferences.foodPreferences.join('/') : 'Variety of cuisines'}
✓ Each day has logical geographic theme/focus
✓ Return ONLY valid JSON, no markdown`;

  return { systemPrompt, userPrompt };
};

export default buildTravelPrompt;
