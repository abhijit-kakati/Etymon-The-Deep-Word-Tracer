
import { GoogleGenAI, Type } from "@google/genai";
import { EtymologyResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    rootWord: { type: Type.STRING, description: "The earliest known ancestor word." },
    rootLanguage: { type: Type.STRING, description: "The technical name of the earliest language." },
    simplifiedRootLanguage: { type: Type.STRING, description: "A simple, non-academic name for the root language." },
    originalMeaning: { type: Type.STRING, description: "The original definition of the root word." },
    evolutionSummary: { type: Type.STRING, description: "A high-level summary of how the word reached its modern form." },
    modernWord: { type: Type.STRING, description: "The modern word picked (especially useful for 'Feeling Lucky')." },
    timeline: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          language: { type: Type.STRING, description: "Technical language name (e.g., Old English)." },
          simplifiedLanguage: { type: Type.STRING, description: "Simple language name (e.g., Early Medieval English)." },
          word: { type: Type.STRING },
          period: { type: Type.STRING, description: "Historical era (e.g., 5th Century BCE)." },
          yearsAgo: { type: Type.STRING, description: "Relative time (e.g., approx. 2,500 years ago)." },
          description: { type: Type.STRING, description: "Linguistic changes or context." },
          region: { type: Type.STRING, description: "Geographic location." }
        },
        required: ["language", "simplifiedLanguage", "word", "period", "yearsAgo", "description", "region"]
      }
    }
  },
  required: ["rootWord", "rootLanguage", "simplifiedRootLanguage", "originalMeaning", "evolutionSummary", "timeline"]
};

export const fetchEtymology = async (word: string, language: string): Promise<EtymologyResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Trace the deep etymology of the word "${word}" from the ${language} language. 
    Go back to the earliest known root. 
    
    IMPORTANT INSTRUCTIONS:
    1. For every language name (especially proto-languages like 'Proto-Indo-European'), provide a 'simplifiedLanguage' version that is easily understandable (e.g., 'Ancient Ancestor Language of Europe and India').
    2. For every timeline step, estimate how many 'yearsAgo' this was (e.g., '6,000 years ago').
    3. Provide an unbiased, accurate linguistic history.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text.trim()) as EtymologyResult;
};

export const fetchRandomEtymology = async (language: string): Promise<EtymologyResult & { modernWord: string }> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Pick a random, interesting word from the ${language} language that has a rich and deep etymological history (tracing back several millennia). Trace its origin to its earliest root.
    
    IMPORTANT INSTRUCTIONS:
    1. For every language name (especially proto-languages like 'Proto-Indo-European'), provide a 'simplifiedLanguage' version that is easily understandable.
    2. For every timeline step, estimate how many 'yearsAgo' this was.
    3. Provide an unbiased, accurate linguistic history.
    4. Return the modern word picked in the 'modernWord' field.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text.trim()) as EtymologyResult & { modernWord: string };
};
