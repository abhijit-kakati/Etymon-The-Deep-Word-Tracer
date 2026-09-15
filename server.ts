import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { FALLBACK_ETYMOLOGY } from './server/fallbackData.ts';

const app = express();
const PORT = 3000;

app.use(express.json());

const getApiKey = () => {
  return process.env.GEMINI_API_KEY || process.env.API_KEY || '';
};

// Response schema for structured Gemini etymology tracing
const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    rootWord: { type: Type.STRING, description: "The earliest known ancestor root word (e.g., *leg-, *ters-)." },
    rootLanguage: { type: Type.STRING, description: "The technical name of the earliest language (e.g., Proto-Indo-European)." },
    simplifiedRootLanguage: { type: Type.STRING, description: "A simple, non-academic name for the root language (e.g., Ancient Eurasian Ancestor)." },
    originalMeaning: { type: Type.STRING, description: "The original historical definition of the root word." },
    evolutionSummary: { type: Type.STRING, description: "A high-level readable summary of how the word reached its modern form." },
    modernWord: { type: Type.STRING, description: "The modern word (useful for random selections)." },
    timeline: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          language: { type: Type.STRING, description: "Technical language name (e.g., Old English, Ancient Greek)." },
          simplifiedLanguage: { type: Type.STRING, description: "Simple, easy-to-understand name (e.g., Classical Greek, Medieval French)." },
          word: { type: Type.STRING, description: "The word form in that era." },
          period: { type: Type.STRING, description: "Historical era (e.g., 5th Century BCE)." },
          yearsAgo: { type: Type.STRING, description: "Estimated age (e.g., approx. 2,500 years ago)." },
          description: { type: Type.STRING, description: "Linguistic changes, cultural context, or semantic shifts." },
          region: { type: Type.STRING, description: "Geographic region of usage." }
        },
        required: ["language", "simplifiedLanguage", "word", "period", "yearsAgo", "description", "region"]
      }
    }
  },
  required: ["rootWord", "rootLanguage", "simplifiedRootLanguage", "originalMeaning", "evolutionSummary", "timeline"]
};

// Available free-tier models in priority order
const CANDIDATE_MODELS = ['gemini-3.6-flash', 'gemini-3.5-flash-lite'];

// API Health check
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(getApiKey());
  res.json({ status: 'ok', hasKey });
});

// Helper to generate etymology across models
async function generateWithFallback(ai: GoogleGenAI, contents: string) {
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
          responseMimeType: 'application/json',
          responseSchema: RESPONSE_SCHEMA
        }
      });

      if (response.text) {
        return {
          data: JSON.parse(response.text.trim()),
          modelUsed: model
        };
      }
    } catch (err: any) {
      console.warn(`Attempt with ${model} failed:`, err?.message || err);
      lastError = err;
      // Brief pause before fallback attempt
      await new Promise(resolve => setTimeout(resolve, 600));
    }
  }

  throw lastError || new Error('All model attempts exhausted');
}

// Trace specific word
app.post('/api/etymology', async (req, res) => {
  const { word, language } = req.body;

  if (!word || typeof word !== 'string' || !word.trim()) {
    return res.status(400).json({ error: 'Word parameter is required' });
  }

  const cleanWord = word.trim();
  const cleanLang = (language && typeof language === 'string' ? language.trim() : 'English');
  const normalizedKey = cleanWord.toLowerCase();

  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Trace the deep etymology of the word "${cleanWord}" from the ${cleanLang} language.
Go back to the earliest known root ancestor.

CRITICAL INSTRUCTIONS:
1. For every language name (especially proto-languages like 'Proto-Indo-European' or 'Proto-Dravidian'), provide a 'simplifiedLanguage' version that is easily understandable for everyday readers.
2. For every timeline step, estimate how many 'yearsAgo' this was (e.g., 'approx. 4,500 years ago').
3. Provide an unbiased, philologically accurate history with 3-6 progressive chronological stages.
4. Ensure the output strictly conforms to the JSON schema.`;

      const result = await generateWithFallback(ai, prompt);

      return res.json({
        data: {
          ...result.data,
          modernWord: result.data.modernWord || cleanWord
        },
        source: result.modelUsed
      });
    } catch (err: any) {
      console.warn('Etymology generation failed for word:', cleanWord, err?.message || err);

      // Check if we have a verified entry for this word
      if (FALLBACK_ETYMOLOGY[normalizedKey]) {
        return res.json({
          data: FALLBACK_ETYMOLOGY[normalizedKey],
          source: 'verified-archive',
          notice: 'Retrieved from verified linguistic archive while AI engine is experiencing high traffic.'
        });
      }

      return res.status(400).json({
        error: 'The linguistic model is currently experiencing high demand. Please try again in a few moments, or explore one of the sample words below.'
      });
    }
  }

  // If no API key configured or fallback matched
  if (FALLBACK_ETYMOLOGY[normalizedKey]) {
    return res.json({
      data: FALLBACK_ETYMOLOGY[normalizedKey],
      source: 'verified-archive'
    });
  }

  return res.status(400).json({
    error: 'Gemini API key is not configured. You can explore sample words like "Man", "Tiger", "Dialogue", "Music", "Terra", "Philosophy", "Robot", or "Galaxy".'
  });
});

// Pick a random word
app.post('/api/random-etymology', async (req, res) => {
  const { language } = req.body;
  const cleanLang = (language && typeof language === 'string' ? language.trim() : 'English');

  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Pick a random, interesting, culturally rich word from the ${cleanLang} language that has a fascinating deep etymological history (tracing back multiple millennia). Trace its origin to its earliest root.

CRITICAL INSTRUCTIONS:
1. For every language name (especially proto-languages like 'Proto-Indo-European'), provide a 'simplifiedLanguage' version that is easily understandable.
2. For every timeline step, estimate how many 'yearsAgo' this was.
3. Provide an unbiased, accurate linguistic history with 3-6 chronological steps.
4. Return the modern word picked in the 'modernWord' field.`;

      const result = await generateWithFallback(ai, prompt);

      return res.json({
        data: result.data,
        source: result.modelUsed
      });
    } catch (err: any) {
      console.warn('Gemini random generation error:', err?.message || err);
      const keys = Object.keys(FALLBACK_ETYMOLOGY);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return res.json({
        data: FALLBACK_ETYMOLOGY[randomKey],
        source: 'verified-archive',
        notice: 'Selected from verified linguistic collection.'
      });
    }
  }

  // Fallback if no key
  const keys = Object.keys(FALLBACK_ETYMOLOGY);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return res.json({
    data: FALLBACK_ETYMOLOGY[randomKey],
    source: 'verified-archive'
  });
});

// Vite middleware / production serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Express v5 requires '*all' wildcard route
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Etymon Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
