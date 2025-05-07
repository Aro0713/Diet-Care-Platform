import { OpenAI } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';
import { Meal } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const languageMap: Record<string, string> = {
  pl: 'polski',
  en: 'English',
  es: 'espanol',
  fr: 'français',
  de: 'Deutsch',
  ua: '??????????',
  ru: '???????',
  zh: '??',
  hi: '??????',
  ar: '???????',
  he: '?????',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const {
    form,
    interviewData,
    lang = 'pl',
  }: {
    form: any;
    interviewData: any;
    lang?: string;
  } = req.body;

  const {
    age,
    sex,
    weight,
    height,
    allergies,
    region,
    medical,
  } = form;

  const {
    goal,
    cuisine,
    model,
    lifestyle,
    mealsPerDay,
    goals,
    ...restInterview
  } = interviewData;

  const bmi =
    weight && height
      ? parseFloat((weight / ((height / 100) ** 2)).toFixed(1))
      : null;

  const selectedLang = languageMap[lang] || 'polski';

  const patientData = {
    ...form,
    ...interviewData,
    bmi,
    language: selectedLang,
  };

  const prompt = `
You are an expert clinical dietitian AI.

Your task is to generate a complete, medically sound, 7-day diet plan for a real patient.

?? ALL patient data below is important and must be considered:
- Age, sex, weight, height, BMI
- All medical conditions and test results
- Lifestyle (sleep, stress, water, alcohol, fast-food, supplements)
- Preferred cuisine, diet model, goals
- Calculation results (PPM, CPM, protein/fat/carb needs) if provided
- Any allergies or regional factors

?? Requirements:
- You MUST adapt calorie levels, nutrient composition, and dietary style to the patient's medical conditions, physiological needs, and dietary limitations.
- The diet must support the healing process, prevent further complications, and avoid aggravating existing diseases.

Return only valid JSON in this exact format:

{
  "Monday": [
    {
      "name": "translated meal name",
      "ingredients": [{ "product": "translated product", "weight": 120 }],
      "calories": 400,
      "glycemicIndex": 45
    }
  ],
  ...
}

Strict rules:
- Always return exactly 7 days: from "Monday" to "Sunday" (do NOT translate day keys).
- Each day must contain between 3 and 5 meals.
- All content (meal names, products, units) must be written in: ${selectedLang}.
- Return JSON only — no explanation, no markdown, no notes.

?? Patient data:
${JSON.stringify(patientData, null, 2)}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const rawText = completion.choices[0]?.message?.content || '';
    console.log('?? rawText:', rawText);

    if (
      !rawText ||
      rawText.length < 100 ||
      !rawText.includes('{') ||
      !rawText.includes('name') ||
      !rawText.includes('calories')
    ) {
      console.warn('?? Nieprawidłowa lub zbyt krótka odpowiedź z OpenAI.');
      return res.status(500).json({ error: 'Nieprawidłowa odpowiedź z AI – brak danych diety.' });
    }

    let parsed: Record<string, Meal[]>;

    try {
      parsed = JSON.parse(rawText);
      console.log('? parsed diet:', parsed);
    } catch (parseError) {
      console.error('? Błąd parsowania JSON:', rawText);
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
    console.error('? Błąd OpenAI:', err.message || err);
    return res.status(500).json({ error: 'Błąd generowania diety.' });
  }
}
