import { PatientData, Meal, MedicalData, TestResult } from "../types";

export async function generateDietPdf(patient: PatientData, bmi: number | null, diet: Meal[]) {
  const pdfMake = (await import('pdfmake/build/pdfmake')).default;
  const pdfFonts = (await import('pdfmake/build/vfs_fonts')).default;
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const content = [
    { text: 'Plan żywieniowy pacjenta', style: 'header' },
    { text: `Data: ${new Date().toLocaleString()}`, margin: [0, 0, 0, 10] },
    {
      text: `Dane pacjenta:\nWiek: ${patient.age} lat | Płeć: ${patient.gender} | Waga: ${patient.weight} kg | Wzrost: ${patient.height} cm | BMI: ${bmi ?? 'n/a'}`,
      margin: [0, 0, 0, 10]
    },
    {
      text: `Schorzenia: ${patient.conditions?.join(', ') || 'brak'}\nAlergie: ${patient.allergies || 'brak'}\nRegion: ${patient.region || 'brak'}`,
      margin: [0, 0, 0, 10]
    },
    {
      text: 'Uwzględnione dane medyczne:',
      style: 'subheader',
      margin: [0, 10, 0, 4]
    },
    ...((patient.medical ?? []) as MedicalData[]).flatMap((entry: MedicalData) => [
      { text: `🩺 ${entry.condition}`, bold: true, margin: [0, 4, 0, 0] },
      ...entry.tests.map((test: TestResult) => ({
        text: `• ${test.name}: ${test.value || '—'}`,
        margin: [10, 0, 0, 0],
        fontSize: 10
      }))
    ]),
    {
      text: 'Zalecana dieta:',
      style: 'subheader',
      margin: [0, 10, 0, 6]
    },
    ...diet.map((meal: Meal) => ({
      table: {
        widths: ['*'],
        body: [
          [{ text: `🍽️ ${meal.name}`, style: 'mealTitle' }],
          [
            {
              text: meal.ingredients.map(i => `• ${i.product} – ${i.weight} g`).join('\n')
            }
          ],
          [
            {
              text: `Kalorie: ${meal.calories} kcal | Indeks glikemiczny: ${meal.glycemicIndex}`,
              style: 'mealInfo'
            }
          ]
        ]
      },
      layout: 'lightHorizontalLines',
      margin: [0, 0, 0, 10]
    })),
    {
      text: '---\n© ALS sp. z o.o. | KRS 0000087600 | NIP 6252121456 | REGON 266795439\nEmail: a4p.email@gmail.com | tel. +48 500 720 242',
      style: 'footer',
      margin: [0, 20, 0, 0],
      alignment: 'center'
    }
  ];

  const docDefinition = {
    content,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 14,
        bold: true
      },
      mealTitle: {
        bold: true,
        fillColor: '#eeeeee'
      },
      mealInfo: {
        italics: true,
        fontSize: 10,
        color: '#333333'
      },
      footer: {
        fontSize: 9,
        color: 'gray'
      }
    },
    defaultStyle: {
      fontSize: 11
    }
  };

  pdfMake.createPdf(docDefinition).download(`dieta_${new Date().toISOString().slice(0, 10)}.pdf`);
}
