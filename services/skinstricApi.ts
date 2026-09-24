// Interface - PhaseOneResponse
export interface PhaseOneResponse {
  message?: string;
  success?: boolean;
  [key: string]: unknown;
}

// Interface - DemographicScores
export interface DemographicScores {
  [key: string]: number;
}

// Interface - AnalysisData
export interface AnalysisData {
  race: DemographicScores;
  age: DemographicScores;
  gender: DemographicScores;
}

// Phase 1 Endpoint Handler
export async function callSkinstricPhaseOne(payload: {
  name: string;
  location: string;
}): Promise<PhaseOneResponse> {
  try {
    const response = await fetch(
      'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error(`Phase 1 API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to connect to Phase One endpoint:', error);
    throw error;
  }
}

// Phase 2 Endpoint Handler
export async function analyzeSkinImage(
  base64Image: string,
): Promise<AnalysisData> {
  try {
    const response = await fetch(
      'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      },
    );

    if (!response.ok) {
      throw new Error(`Phase 2 API error: ${response.statusText}`);
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error('Failed to analyze image via Phase Two endpoint:', error);
    throw error;
  }
}

// Function: getSortedScores
// Helper to sort scores in descending order and format to 2 decimal places
export function getSortedScores(scores: DemographicScores) {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([key, value]) => ({
      key,
      value: (value * 100).toFixed(2),
      raw: value,
    }));
}
