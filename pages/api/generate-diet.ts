import { OpenAI } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';
import { Meal } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const languageMap: Record<string, string> = {
  pl: 'polski',
  en: 'English',
  es: 'español',
  fr: 'français',
  de: 'Deutsch',
  ua: 'українська',
  ru: 'русский',
  zh: '中文',
  hi: 'हिन्दी',
  ar: 'العربية',
  he: 'עברית',
};

type DietRequestBody = {
  age: string | number;
  gender: string;
  weight: string | number;
  height: string | number;
  allergies?: string;
  region: string;
  medical?: { selectedConditions?: string[] };
  interview?: { lifestyle?: string; mealsPerDay?: string };
  goal: string;
  cuisine: string;
  model: string;
  lang?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const body = req.body as DietRequestBody;

  const {
    age,
    gender,
    weight,
    height,
    allergies,
    region,
    medical,
    interview,
    goal,
    cuisine,
    model,
    lang = 'pl',
  } = body;

  const selectedLang = languageMap[lang] || 'polski';

  const prompt = `
  You are an experienced clinical dietitian AI.
  
  Generate a personalized 7-day diet plan strictly in the language: ${selectedLang}.
  Use only ${selectedLang} for all content: day names, meal names, ingredients, units.
  Do not include any other language.
  
  Analyze:
  - all patient medical data (including lab results and conditions),
  - interview data (lifestyle, preferences),
  - preferred cuisine and diet model,
  - based on trusted sources: USDA, IŻŻ, PZH, Open Food Facts, ESPEN, EFSA, NICE, AND, PubMed, Cochrane.
  
  Return the diet as a JSON object in this exact format:
  
  {
    "Monday": [
      {
        "name": "translated meal name",
        "ingredients": [{ "product": "translated product", "weight": 120 }],
        "calories": 400,
        "glycemicIndex": 45
      },
      ...
    ],
    ...
  }
  
  Important rules:
  - Use exactly 7 keys for days: \"Monday\" to \"Sunday\" (do not translate day names).
  - Each value must be an array of meals (Meal[]). Never return nested objects like { \"Śniadanie\": {...} }.
  - Each day must contain between 3 and 5 meals.
  - Return only valid JSON. No markdown, no headings, no explanation.
  
  Patient info:
  - Age: ${age}
  - Gender: ${gender}
  - Weight: ${weight} kg
  - Height: ${height} cm
  - Region: ${region}
  - Allergies: ${allergies || 'none'}
  - Conditions: ${medical?.selectedConditions?.join(', ') || 'none'}
  - Goal: ${goal}
  - Cuisine: ${cuisine}
  - Diet model: ${model}
  - Lifestyle: ${interview?.lifestyle || 'N/A'}
  `;
  
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 3000, // kontrola kosztów
    });

    const rawText = completion.choices[0]?.message?.content || '';
    console.log('🧾 rawText:', rawText);

    // Walidacja minimalna zawartości
    if (
      !rawText ||
      rawText.length < 100 ||
      !rawText.includes('{') ||
      !rawText.includes('name') ||
      !rawText.includes('calories')
    ) {
      console.warn('⚠️ Nieprawidłowa lub zbyt krótka odpowiedź z OpenAI.');
      return res.status(500).json({ error: 'Nieprawidłowa odpowiedź z AI – brak danych diety.' });
    }

    let parsed: Record<string, Meal[]>;

    try {
      parsed = JSON.parse(rawText);
      console.log('✅ parsed diet:', parsed);
    } catch (parseError) {
      console.error('❌ Błąd parsowania JSON:', rawText);
      return res.status(500).json({ error: 'Nie udało się sparsować diety z AI.' });
    }

    const ensureCompleteWeek = (diet: Record<string, Meal[]>) => {
      const defaultMeal = {
        name: '',
        ingredients: [],
        calories: 0,
        glycemicIndex: 0,
      };
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for (const day of days) {
        if (!diet[day]) diet[day] = [];
        while (diet[day].length < 3) {
          diet[day].push({ ...defaultMeal });
        }
      }
      return diet;
    };

    const completed = ensureCompleteWeek(parsed);
    return res.status(200).json({ diet: completed });
  } catch (err: any) {
    console.error('❌ Błąd OpenAI:', err.message || err);
    return res.status(500).json({ error: 'Błąd generowania diety.' });
  }
}
