import { EtymologyResult } from '../types';

export interface EtymologyResponseWithMeta extends EtymologyResult {
  modernWord?: string;
  source?: string;
  notice?: string;
}

async function safeParseJson(response: Response): Promise<any> {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    if (!response.ok) {
      throw new Error(`Service temporarily busy (${response.status}). Please try again in a moment.`);
    }
    throw new Error('Received unexpected response format. Please try again.');
  }
}

export const fetchEtymology = async (word: string, language: string): Promise<EtymologyResponseWithMeta> => {
  const response = await fetch('/api/etymology', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ word, language }),
  });

  const resJson = await safeParseJson(response);

  if (!response.ok || resJson.error) {
    throw new Error(resJson.error || 'Failed to trace word origin. Please try again.');
  }

  return {
    ...resJson.data,
    source: resJson.source,
    notice: resJson.notice,
  };
};

export const fetchRandomEtymology = async (language: string): Promise<EtymologyResponseWithMeta & { modernWord: string }> => {
  const response = await fetch('/api/random-etymology', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ language }),
  });

  const resJson = await safeParseJson(response);

  if (!response.ok || resJson.error) {
    throw new Error(resJson.error || 'Failed to retrieve random word origin. Please try again.');
  }

  return {
    ...resJson.data,
    modernWord: resJson.data.modernWord || 'Word',
    source: resJson.source,
    notice: resJson.notice,
  };
};
