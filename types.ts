
export interface EtymologyStep {
  language: string;
  simplifiedLanguage: string;
  word: string;
  period: string;
  yearsAgo: string; // e.g., "approx. 4,500 years ago"
  description: string;
  region: string;
}

export interface EtymologyResult {
  rootWord: string;
  rootLanguage: string;
  simplifiedRootLanguage: string;
  originalMeaning: string;
  evolutionSummary: string;
  timeline: EtymologyStep[];
}

export interface LanguageOption {
  code: string;
  name: string;
}
