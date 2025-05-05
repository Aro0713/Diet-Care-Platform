import Head from 'next/head'
import { useState, useEffect } from 'react'
import DietEditor from '../components/DietEditor'
import MedicalForm from '../components/MedicalForm'
import InterviewForm from '../components/InterviewForm'
import SelectCuisineForm from '../components/SelectCuisineForm'
import DietGoalForm from '../components/DietGoalForm'
import SelectModelForm from '../components/SelectModelForm'
import { generateDietPdf } from '../utils/generateDietPdf'
import { Meal, PatientData } from '../types'
import { validateDiet } from '../utils/validateDiet'
import fallbackDiets from '../utils/fallbackDiets'
import { useRouter } from 'next/router'
import { getTranslation } from '../utils/i18n'
import { generateInterviewPdf } from '../utils/generateInterviewPdf'
import ConfirmationModal from '@/components/ConfirmationModal'
import { translations } from '@/utils/translations'
import DietTable from "@/components/DietTable"; // ✅ poprawnie
import { MedicalData } from '../types'

function Panel() {
  type Lang = keyof typeof translations["title"];
  const [lang, setLang] = useState<Lang>('pl')

  const t = (key: keyof typeof translations): string => {
    return translations[key]?.[lang] || key
  }

  const [diet, setDiet] = useState<Record<string, Meal[]> | null>(null)
  const [confirmedDiet, setConfirmedDiet] = useState<Meal[] | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<number, string[]>>({})
  const [editableDiet, setEditableDiet] = useState<Record<string, Meal[]>>({})
  const [bmi, setBmi] = useState<number | null>(null)
  const [form, setForm] = useState<PatientData>({
    age: 0,
    gender: '',
    weight: 0,
    height: 0,
    allergies: '',
    region: '',
    conditions: [],
    medical: []
  });

  const [interviewData, setInterviewData] = useState<any>({})
  const [goal, setGoal] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [model, setModel] = useState('')
  const [history, setHistory] = useState<any[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [drafts, setDrafts] = useState<any[]>([])
  const [showDrafts, setShowDrafts] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [missingFields, setMissingFields] = useState<string[]>([])
  const [submitPending, setSubmitPending] = useState<(() => void) | null>(null)
  const [dietApproved, setDietApproved] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const savedLang = localStorage.getItem('platformLang') as Lang
    if (savedLang) setLang(savedLang)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleMedicalChange = (data: any) => {
    const testResults: Record<string, string> = {};
    const selectedGroups: string[] = [];

    if (!Array.isArray(data)) return;

    for (const entry of data) {
      if (entry?.condition) {
        selectedGroups.push(entry.condition);
      }

      if (Array.isArray(entry?.tests)) {
        for (const test of entry.tests) {
          if (test?.name && typeof test.value === 'string') {
            testResults[test.name] = test.value;
          }
        }
      }
    }

    const convertedMedical: MedicalData[] = selectedGroups.map((condition) => ({
      condition,
      tests: Object.entries(testResults).map(([name, value]) => ({ name, value }))
    }));

    setForm((prev) => ({
      ...prev,
      medical: convertedMedical,
      conditions: selectedGroups
    }));
  };

  const handleDietSave = (meals: Meal[]) => {
    const errors = validateDiet(meals);
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      setConfirmedDiet(meals);
      setDietApproved(true);
    }
  };
  const dayMap = {
    Monday: 'Poniedziałek',
    Tuesday: 'Wtorek',
    Wednesday: 'Środa',
    Thursday: 'Czwartek',
    Friday: 'Piątek',
    Saturday: 'Sobota',
    Sunday: 'Niedziela',
  };
  const mapDaysToPolish = (diet: Record<string, Meal[]>): Record<string, Meal[]> => {
    const translated: Record<string, Meal[]> = {};
    for (const day in diet) {
      const translatedDay = dayMap[day as keyof typeof dayMap] || day;
      translated[translatedDay] = diet[day];
    }
    return translated;
  };
  
  const normalizeDiet = (diet: Record<string, Meal[]>): Record<string, Meal[]> => {
    const result: Record<string, Meal[]> = {};
    const defaultMeal: Meal = {
      name: '',
      ingredients: [],
      calories: 0,
      glycemicIndex: 0,
    };
  
    for (const day in diet) {
      const meals = [...diet[day].slice(0, 3)]; // maks 3
      while (meals.length < 3) {
        meals.push({ ...defaultMeal });
      }
      result[day] = meals;
    }
  
    return result;
  };
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const missing: string[] = [];
  if (!form.age) missing.push(t('age'));
  if (!form.gender) missing.push(t('gender'));
  if (!form.weight) missing.push(t('weight'));
  if (!form.height) missing.push(t('height'));
  if (!goal) missing.push(t('goal'));
  if (!cuisine) missing.push(t('cuisine'));

  if (missing.length > 0) {
    setMissingFields(missing);
    setShowConfirmModal(true);
    setSubmitPending(() => () => handleSubmit(e));
    return;
  }

  const bmiCalc = form.weight / ((form.height / 100) ** 2);
  setBmi(parseFloat(bmiCalc.toFixed(1)));

  setIsGenerating(true);
  try {
    const res = await fetch('/api/generate-diet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form, interviewData, goal, cuisine, model, lang }),
    });

    const data = await res.json();

    if (!res.ok || !data.diet) {
      throw new Error(data.error || 'Nie udało się wygenerować diety.');
    }

    const translatedDiet = mapDaysToPolish(data.diet);
const normalizedDiet = normalizeDiet(translatedDiet);
setDiet(normalizedDiet);
setEditableDiet(normalizedDiet);
  } catch (err: any) {
    console.error('❌ Błąd generowania diety:', err.message || err);
    alert('Wystąpił błąd podczas generowania diety. Spróbuj ponownie.');
  } finally {
    setIsGenerating(false);
  }
};
<h1 style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
  🔴 TEST: WERSJA ZDEPLOYOWANA NA VERCEL
</h1>

  return (
    <div className="min-h-screen bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat backdrop-blur-sm">
      <Head>
        <title>Platforma Dietetyczna – Panel Lekarza</title>
      </Head>

      <ConfirmationModal
        open={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        missingFields={missingFields}
        onConfirm={() => {
          setShowConfirmModal(false);
          submitPending?.();
        }}
      />

      {/* Język interfejsu */}
      <div className="mb-6 p-4">
        <label className="block font-semibold mb-1">{t('selectLanguage')}:</label>
        <select
          className="border px-2 py-1 rounded w-full max-w-xs"
          value={lang}
          onChange={(e) => {
            const selected = e.target.value as Lang;
            setLang(selected);
            localStorage.setItem('platformLang', selected);
          }}
        >
          <option value="pl">Polski</option>
          <option value="en">English</option>
          <option value="ua">Українська</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="ru">Русский</option>
          <option value="zh">中文</option>
          <option value="hi">हिन्दी</option>
          <option value="ar">العربية</option>
          <option value="he">עברית</option>
        </select>
      </div>

      {/* Główna sekcja – kolumny */}
      <div className="bg-white/70 min-h-screen p-8 flex flex-col md:flex-row gap-8 items-start">
        {/* Lewa kolumna */}
        <div className="w-full md:w-1/2 max-h-[90vh] overflow-y-auto pr-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-sm text-gray-600">{t('subtitle')}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">{t('age')}</label>
                <input name="age" type="number" className="w-full border px-2 py-1" onChange={handleChange} required />
              </div>
              <div>
                <label className="block mb-1">{t('gender')}</label>
                <select name="gender" className="w-full border px-2 py-1" onChange={handleChange} required>
                  <option value="">{t('gender')}</option>
                  <option value="Kobieta">{t('female')}</option>
                  <option value="Mężczyzna">{t('male')}</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">{t('weight')}</label>
                <input name="weight" type="number" className="w-full border px-2 py-1" onChange={handleChange} required />
              </div>
              <div>
                <label className="block mb-1">{t('height')}</label>
                <input name="height" type="number" className="w-full border px-2 py-1" onChange={handleChange} required />
              </div>
            </div>

            {/* Wybory */}
            <div className="mt-6">
              <label className="block font-semibold mb-1">{t('selectDietGoal')}</label>
              <DietGoalForm onChange={setGoal} lang={lang} />
            </div>

            <div className="mt-4">
              <label className="block font-semibold mb-1">{t('selectCuisine')}</label>
              <SelectCuisineForm onChange={setCuisine} />
            </div>

            <div className="mt-4">
              <label className="block font-semibold mb-1">{t('selectModel')}</label>
              <SelectModelForm onChange={setModel} />
            </div>

            <MedicalForm onChange={handleMedicalChange} />

            {/* Przycisk */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={isGenerating}
            >
              {isGenerating ? '✍️ Piszę dietę...' : t('generate')}
            </button>

            {/* BMI */}
            {bmi && (
              <p className="text-blue-800 font-semibold mt-2">
                {t('bmiLabel')}: {bmi} (
                {bmi < 18.5
                  ? t('underweight')
                  : bmi < 25
                  ? t('normal')
                  : bmi < 30
                  ? t('overweight')
                  : t('obesity')}
                )
              </p>
            )}
          </form>
        </div>

        {/* Prawa kolumna */}
        <div className="w-full md:w-1/2 max-h-[90vh] overflow-y-auto pr-2 space-y-6">
          <InterviewForm
            onChange={(data) => setInterviewData({ ...interviewData, ...data })}
            form={form}
            bmi={bmi}
            editableDiet={editableDiet}
          />
        </div>
      </div>

      {/* Tabela z dietą */}
      {diet && (
  <div className="w-full px-8 mt-10">
    <DietTable
      editableDiet={editableDiet}
      setEditableDiet={setEditableDiet}
      setConfirmedDiet={(diet) => {
        handleDietSave(Object.values(diet).flat()); // zamienia Record<string, Meal[]> → Meal[]
      }}
      isEditable={!dietApproved}
    />
  </div>
)}


      {/* Przycisk PDF */}
      {confirmedDiet && (
        <div className="w-full px-8 mt-10 text-center">
          <button
            onClick={() => generateDietPdf(form, bmi, confirmedDiet)}
            className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            📄 Generuj PDF
          </button>
        </div>
      )}
    </div>
  );
}; // 👈 Zamyka funkcję komponentu

export default Panel;
 