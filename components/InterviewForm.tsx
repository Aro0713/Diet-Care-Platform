import React, { useState, useEffect } from 'react';
import SectionGoals from './SectionGoals';
import SectionLifestyle from './SectionLifestyle';
import SectionFoodHabits from './SectionFoodHabits';
import SectionDigestion from './SectionDigestion';
import SectionHormonal from './SectionHormonal';
import { generateInterviewPdf } from '../utils/generateInterviewPdf';
import { PatientData, Meal } from '@/types';

interface Props {
  onChange: (data: any) => void;
  form: PatientData;
  bmi: number | null;
  editableDiet: Record<string, Meal[]>;
}

interface InterviewData {
  expectations: string;
  previousDiets: string;
  currentDiet: string;
  goals: string[];
  chronicDiseases: string;
  medications: string;
  supplements: string;
  activity: string;
  sleep: string;
  stress: string;
  smoking: string;
  alcohol: string;
  caffeine: string;
  mealsPerDay: string;
  mealTimes: string;
  snacking: string;
  breakfast: string;
  sweets: string;
  water: string;
  processedFood: string;
  cookingHabits: string;
  foodFrequencies: string;
  foodPreferences: string;
  intolerances: string;
  digestiveIssues: string;
  bowelFrequency: string;
  diagnosedConditions: string;
  motivation: number;
  barriers: string;
  timeAvailable: string;
  budgetLimits: string;
  otherNotes: string;
  menstrualCycle: string;
  hormonalIssues: string;
  pregnancyOrBreastfeeding: string;
  contraception: string;
}

interface Props {
  onChange: (data: any) => void;
  form: PatientData;
  bmi: number | null;
  editableDiet: Record<string, Meal[]>;
}

export default function InterviewForm({ onChange, form, bmi, editableDiet }: Props) {
  const [data, setData] = useState<InterviewData>({
    expectations: '',
    previousDiets: '',
    currentDiet: '',
    goals: [],
    chronicDiseases: '',
    medications: '',
    supplements: '',
    activity: '',
    sleep: '',
    stress: '',
    smoking: '',
    alcohol: '',
    caffeine: '',
    mealsPerDay: '',
    mealTimes: '',
    snacking: '',
    breakfast: '',
    sweets: '',
    water: '',
    processedFood: '',
    cookingHabits: '',
    foodFrequencies: '',
    foodPreferences: '',
    intolerances: '',
    digestiveIssues: '',
    bowelFrequency: '',
    diagnosedConditions: '',
    motivation: 5,
    barriers: '',
    timeAvailable: '',
    budgetLimits: '',
    otherNotes: '',
    menstrualCycle: '',
    hormonalIssues: '',
    pregnancyOrBreastfeeding: '',
    contraception: '',
  });

  // ✅ Poprawione — teraz TS akceptuje string jako nazwę pola
  function handleFieldChange(field: string, value: any) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  useEffect(() => {
    onChange(data);
  }, [data, onChange]);

  const handleSendToPatient = () => {
    const record = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      interview: data
    };

    const history = JSON.parse(localStorage.getItem('interviewHistory') || '[]');
    history.push(record);
    localStorage.setItem('interviewHistory', JSON.stringify(history));

    alert('📤 Wywiad został zapisany i wysłany pacjentowi (symulacja)');
  };

  return (
    <div className='bg-white p-4 rounded shadow space-y-4 mt-6'>
      <h2 className='text-xl font-bold'>Wywiad dietetyczny – podstawowe informacje</h2>

      <SectionGoals data={data} onChange={handleFieldChange} />
      <SectionLifestyle data={data} onChange={handleFieldChange} />
      <SectionFoodHabits data={data} onChange={handleFieldChange} />
      <SectionDigestion data={data} onChange={handleFieldChange} />
      <SectionHormonal data={data} onChange={handleFieldChange} />

      <div>
        <label className='block font-semibold'>Oczekiwania względem współpracy:</label>
        <textarea
          className='w-full border px-2 py-1'
          value={data.expectations}
          onChange={(e) => handleFieldChange('expectations', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Czy była Pani/Pan wcześniej na diecie? Jakie efekty?</label>
        <textarea
          className='w-full border px-2 py-1'
          value={data.previousDiets}
          onChange={(e) => handleFieldChange('previousDiets', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Czy obecnie stosuje Pani/Pan jakąś dietę?</label>
        <textarea
          className='w-full border px-2 py-1'
          value={data.currentDiet}
          onChange={(e) => handleFieldChange('currentDiet', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Czy są inne uwagi, o których powinniśmy wiedzieć?</label>
        <textarea
          className='w-full border px-2 py-1'
          value={data.otherNotes}
          onChange={(e) => handleFieldChange('otherNotes', e.target.value)}
        />
      </div>

      <div className='flex gap-4 pt-4'>
        <button
          onClick={() => generateInterviewPdf(form, bmi, Object.values(editableDiet).flat())}

          className='bg-green-700 text-white px-4 py-2 rounded'
        >
          📄 Pobierz wywiad jako PDF
        </button>

        <button
          onClick={handleSendToPatient}
          className='bg-blue-600 text-white px-4 py-2 rounded'
        >
          ✉️ Zapisz i wyślij pacjentowi
        </button>
      </div>
    </div>
  );
}
export {}; // ← dodaj na końcu pliku lub na początku
