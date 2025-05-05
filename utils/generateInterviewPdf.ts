import { PatientData, Meal, MedicalData } from '@/types';

export const generateInterviewPdf = async (
  form: PatientData,
  bmi: number | null,
  confirmedDiet: Meal[]
) => {
  const pdfMake = (await import('pdfmake/build/pdfmake')).default;
  const pdfFonts = await import('pdfmake/build/vfs_fonts');
  (pdfMake as any).vfs = pdfFonts.vfs;

  const content: any[] = [];

  content.push({ text: '📝 Wywiad dietetyczny', style: 'header', margin: [0, 0, 0, 10] });
  content.push({ text: `Wiek: ${form.age}` });
  content.push({ text: `Płeć: ${form.gender}` });
  content.push({ text: `Waga: ${form.weight} kg` });
  content.push({ text: `Wzrost: ${form.height} cm` });
  if (bmi !== null) content.push({ text: `BMI: ${bmi}` });
  content.push({ text: `Alergie: ${form.allergies || 'brak'}` });
  content.push({ text: `Region: ${form.region || 'brak'}` });

  content.push({ text: '\n📋 Choroby i wyniki badań', style: 'subheader', margin: [0, 10, 0, 6] });

  const conditions = (form.medical as MedicalData[]).map(entry => entry.condition).filter(Boolean);
  if (conditions.length) {
    content.push({ text: `Choroby: ${conditions.join(', ')}` });
  }

  const testResults: Record<string, string> = {};
  (form.medical as MedicalData[]).forEach(entry => {
    entry.tests.forEach(test => {
      testResults[test.name] = test.value;
    });
  });

  if (confirmedDiet?.length) {
    content.push({ text: '\n📅 Dieta', style: 'subheader', margin: [0, 10, 0, 6] });

    confirmedDiet.forEach((meal) => {
      content.push({ text: `🍽️ ${meal.name}`, style: 'mealHeader' });
      meal.ingredients.forEach((ing) => {
        content.push({ text: `• ${ing.product} – ${ing.weight} g`, margin: [10, 0, 0, 0] });
      });
      content.push({
        text: `Kalorie: ${meal.calories} kcal | IG: ${meal.glycemicIndex}\n`,
        margin: [0, 0, 0, 6]
      });
    });
  }

  const docDefinition = {
    content,
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 14, bold: true },
      mealHeader: { fontSize: 12, bold: true, margin: [0, 4, 0, 2] }
    }
  };

  pdfMake.createPdf(docDefinition).download('wywiad-dietetyczny.pdf');
};
