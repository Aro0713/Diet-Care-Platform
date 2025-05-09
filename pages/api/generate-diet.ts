// /pages/api/generate-diet.ts

import { OpenAI } from 'openai';

export const config = {
  runtime: 'nodejs',
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const languageMap: Record<string, string> = {
  pl: 'polski',
  en: 'English',
  es: 'espanol',
  fr: 'français',
  de: 'Deutsch',
  ua: 'українська',
  ru: 'русский',
  zh: '中文',
  hi: 'हिन्दी',
  ar: 'العربية',
  he: 'עברית',
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Only POST requests are allowed' }), {
      status: 405,
    });
  }

  const { form, interviewData, lang = 'pl' } = await req.json();

  const selectedLang = languageMap[lang] || 'polski';

  const bmi =
    form.weight && form.height
      ? parseFloat((form.weight / ((form.height / 100) ** 2)).toFixed(1))
      : null;

  const patientData = {
    ...form,
    ...interviewData,
    bmi,
    language: selectedLang,
    mealsPerDay: interviewData.mealsPerDay,
  };

  const prompt = `
You are an expert clinical dietitian AI.

Your task is to generate a complete, medically sound, 7-day diet plan for a real patient.

ALL patient data below is important and must be considered:
- Age, sex, weight, height, BMI
- All medical conditions and test results
- Lifestyle (sleep, stress, water, alcohol, fast-food, supplements)
- Preferred cuisine, diet model, goals
- Calculation results (PPM, CPM, protein/fat/carb needs) if provided
- Any allergies or regional factors
- Number of meals per day: defined by physician/dietitian (${interviewData.mealsPerDay})

Requirements:
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
- Each day must contain exactly ${interviewData.mealsPerDay} meals.
- All content (meal names, products, units) must be written in: ${selectedLang}.
- Return JSON only — no explanation, no markdown, no notes.

Patient data:
${JSON.stringify(patientData, null, 2)}
`;

  const stream = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    stream: true,
    temperature: 0.7,
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices?.[0]?.delta?.content;
        if (text) {
          controller.enqueue(encoder.encode(text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
