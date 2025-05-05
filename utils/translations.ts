export type LangKey = 'pl' | 'en' | 'es' | 'fr' | 'de' | 'ua' | 'ru' | 'zh' | 'hi' | 'ar' | 'he';

export type TranslationKey = keyof typeof translations;

export const translations: Record<string, Record<LangKey, string>> = {
  title: {
      pl: 'Panel Lekarza / Dietetyka',
      en: 'Doctor / Dietitian Panel',
      es: 'Panel de Médico / Dietista',
      fr: 'Panneau Médecin / Diététicien',
      de: 'Arzt / Diätetiker Panel',
      ua: 'Панель лікаря / дієтолога',
      ru: 'Панель врача / диетолога',
      zh: '医生/营养师面板',
      hi: 'डॉक्टर / आहार विशेषज्ञ पैनल',
      ar: 'لوحة الطبيب / أخصائي التغذية',
      he: 'פאנל רופא / דיאטן'
    },
    subtitle: {
      pl: 'Wprowadź dane pacjenta i wygeneruj dietę',
      en: 'Enter patient data and generate a diet',
      es: 'Ingrese los datos del paciente y genere una dieta',
      fr: 'Entrez les données du patient et générez un régime',
      de: 'Geben Sie Patientendaten ein und erstellen Sie eine Diät',
      ua: 'Введіть дані пацієнта та створіть дієту',
      ru: 'Введите данные пациента и создайте диету',
      zh: '输入患者数据并生成饮食',
      hi: 'रोगी का डेटा दर्ज करें और एक डाइट जनरेट करें',
      ar: 'أدخل بيانات المريض وقم بإنشاء نظام غذائي',
      he: 'הזן את נתוני המטופל וצור תפריט'
    },
    age: {
      pl: 'Wiek',
      en: 'Age',
      es: 'Edad',
      fr: 'Âge',
      de: 'Alter',
      ua: 'Вік',
      ru: 'Возраст',
      zh: '年龄',
      hi: 'आयु',
      ar: 'العمر',
      he: 'גיל'
    },
    gender: {
      pl: 'Płeć',
      en: 'Gender',
      es: 'Género',
      fr: 'Sexe',
      de: 'Geschlecht',
      ua: 'Стать',
      ru: 'Пол',
      zh: '性别',
      hi: 'लिंग',
      ar: 'الجنس',
      he: 'מין'
    },
    female: {
      pl: 'Kobieta',
      en: 'Female',
      es: 'Mujer',
      fr: 'Femme',
      de: 'Frau',
      ua: 'Жінка',
      ru: 'Женщина',
      zh: '女性',
      hi: 'महिला',
      ar: 'أنثى',
      he: 'אישה'
    },
    male: {
      pl: 'Mężczyzna',
      en: 'Male',
      es: 'Hombre',
      fr: 'Homme',
      de: 'Mann',
      ua: 'Чоловік',
      ru: 'Мужчина',
      zh: '男性',
      hi: 'पुरुष',
      ar: 'ذكر',
      he: 'גבר'
    },
    weight: {
      pl: 'Waga (kg)',
      en: 'Weight (kg)',
      es: 'Peso (kg)',
      fr: 'Poids (kg)',
      de: 'Gewicht (kg)',
      ua: 'Вага (кг)',
      ru: 'Вес (кг)',
      zh: '体重 (公斤)',
      hi: 'वजन (किग्रा)',
      ar: 'الوزن (كجم)',
      he: 'משקל (ק״ג)'
    },
    height: {
      pl: 'Wzrost (cm)',
      en: 'Height (cm)',
      es: 'Altura (cm)',
      fr: 'Taille (cm)',
      de: 'Größe (cm)',
      ua: 'Зріст (см)',
      ru: 'Рост (см)',
      zh: '身高 (厘米)',
      hi: 'ऊंचाई (सेमी)',
      ar: 'الطول (سم)',
      he: 'גובה (ס״מ)'
    },
    allergies: {
      pl: 'Alergie pokarmowe',
      en: 'Food allergies',
      es: 'Alergias alimentarias',
      fr: 'Allergies alimentaires',
      de: 'Nahrungsmittelallergien',
      ua: 'Алергії на їжу',
      ru: 'Пищевые аллергии',
      zh: '食物过敏',
      hi: 'खाद्य एलर्जी',
      ar: 'حساسيات الطعام',
      he: 'אלרגיות למזון'
    },
    region: {
      pl: 'Region świata',
      en: 'World region',
      es: 'Región del mundo',
      fr: 'Région du monde',
      de: 'Weltregion',
      ua: 'Регіон світу',
      ru: 'Регион мира',
      zh: '世界地区',
      hi: 'विश्व क्षेत्र',
      ar: 'منطقة العالم',
      he: 'אזור בעולם'
    },
    selectRegion: {
      pl: 'Wybierz region',
      en: 'Select region',
      es: 'Seleccione una región',
      fr: 'Sélectionnez une région',
      de: 'Region auswählen',
      ua: 'Виберіть регіон',
      ru: 'Выберите регион',
      zh: '选择地区',
      hi: 'क्षेत्र चुनें',
      ar: 'اختر المنطقة',
      he: 'בחר אזור'
    },
    generate: {
      pl: 'Wygeneruj dietę',
      en: 'Generate diet',
      es: 'Generar dieta',
      fr: 'Générer un régime',
      de: 'Diät generieren',
      ua: 'Створити дієту',
      ru: 'Сгенерировать диету',
      zh: '生成饮食',
      hi: 'डाइट जनरेट करें',
      ar: 'إنشاء نظام غذائي',
      he: 'צור תפריט'
    },
    bmiLabel: {
      pl: 'BMI pacjenta',
      en: 'Patient BMI',
      es: 'IMC del paciente',
      fr: 'IMC du patient',
      de: 'Patienten-BMI',
      ua: 'ІМТ пацієнта',
      ru: 'ИМТ пациента',
      zh: '患者的BMI',
      hi: 'रोगी का BMI',
      ar: 'مؤشر كتلة جسم المريض',
      he: 'BMI של המטופל'
    },
    underweight: {
      pl: 'niedowaga',
      en: 'underweight',
      es: 'bajo peso',
      fr: 'insuffisance pondérale',
      de: 'Untergewicht',
      ua: 'недовага',
      ru: 'недовес',
      zh: '偏瘦',
      hi: 'कम वजन',
      ar: 'نقص الوزن',
      he: 'תת משקל'
    },
    normal: {
      pl: 'norma',
      en: 'normal',
      es: 'normal',
      fr: 'normal',
      de: 'normal',
      ua: 'норма',
      ru: 'норма',
      zh: '正常',
      hi: 'सामान्य',
      ar: 'طبيعي',
      he: 'נורמלי'
    },
    overweight: {
      pl: 'nadwaga',
      en: 'overweight',
      es: 'sobrepeso',
      fr: 'surpoids',
      de: 'Übergewicht',
      ua: 'надмірна вага',
      ru: 'избыточный вес',
      zh: '超重',
      hi: 'अधिक वजन',
      ar: 'زيادة الوزن',
      he: 'עודף משקל'
    },
    obesity: {
      pl: 'otyłość',
      en: 'obesity',
      es: 'obesidad',
      fr: 'obésité',
      de: 'Fettleibigkeit',
      ua: 'ожиріння',
      ru: 'ожирение',
      zh: '肥胖',
      hi: 'मोटापा',
      ar: 'السمنة',
      he: 'השמנת יתר'
    },
    approvedDiet: {
      pl: 'Zatwierdzona dieta:',
      en: 'Approved diet:',
      es: 'Dieta aprobada:',
      fr: 'Régime approuvé:',
      de: 'Genehmigte Diät:',
      ua: 'Затверджена дієта:',
      ru: 'Утверждённая диета:',
      zh: '已批准的饮食:',
      hi: 'स्वीकृत डाइट:',
      ar: 'النظام الغذائي المعتمد:',
      he: 'תפריט מאושר:'
    },
    sendToPatient: {
      pl: 'Wyślij pacjentowi',
      en: 'Send to patient',
      es: 'Enviar al paciente',
      fr: 'Envoyer au patient',
      de: 'An den Patienten senden',
      ua: 'Надіслати пацієнту',
      ru: 'Отправить пациенту',
      zh: '发送给患者',
      hi: 'मरीज को भेजें',
      ar: 'إرسال للمريض',
      he: 'שלח למטופל'
    },
    pdf: {
      pl: 'PDF',
      en: 'PDF',
      es: 'PDF',
      fr: 'PDF',
      de: 'PDF',
      ua: 'PDF',
      ru: 'PDF',
      zh: 'PDF',
      hi: 'PDF',
      ar: 'PDF',
      he: 'PDF'
    },
    showDrafts: {
      pl: 'Zobacz wersje robocze',
      en: 'View drafts',
      es: 'Ver borradores',
      fr: 'Voir les brouillons',
      de: 'Entwürfe anzeigen',
      ua: 'Переглянути чернетки',
      ru: 'Просмотреть черновики',
      zh: '查看草稿',
      hi: 'ड्राफ्ट देखें',
      ar: 'عرض المسودات',
      he: 'הצג טיוטות'
    },
    deleteAll: {
      pl: 'Usuń wszystkie',
      en: 'Delete all',
      es: 'Eliminar todo',
      fr: 'Tout supprimer',
      de: 'Alle löschen',
      ua: 'Видалити всі',
      ru: 'Удалить все',
      zh: '全部删除',
      hi: 'सभी हटाएं',
      ar: 'احذف الكل',
      he: 'מחק הכל'
    },
    draftsTitle: {
      pl: 'Wersje robocze diet',
      en: 'Diet drafts',
      es: 'Borradores de dieta',
      fr: 'Brouillons de régime',
      de: 'Diät-Entwürfe',
      ua: 'Чернетки дієт',
      ru: 'Черновики диет',
      zh: '饮食草稿',
      hi: 'डाइट ड्राफ्ट्स',
      ar: 'مسودات الأنظمة الغذائية',
      he: 'טיוטות תפריטים'
    },
    noDrafts: {
      pl: 'Brak zapisanych wersji roboczych.',
      en: 'No saved drafts.',
      es: 'No hay borradores guardados.',
      fr: 'Aucun brouillon enregistré.',
      de: 'Keine gespeicherten Entwürfe.',
      ua: 'Немає збережених чернеток.',
      ru: 'Сохранённых черновиков нет.',
      zh: '没有保存的草稿。',
      hi: 'कोई सहेजे गए ड्राफ्ट नहीं हैं।',
      ar: 'لا توجد مسودات محفوظة.',
      he: 'אין טיוטות שמורות.'
    },
    confirmDeleteDrafts: {
      pl: 'Na pewno usunąć wszystkie wersje robocze?',
      en: 'Are you sure you want to delete all drafts?',
      es: '¿Seguro que quieres eliminar todos los borradores?',
      fr: 'Êtes-vous sûr de vouloir supprimer tous les brouillons ?',
      de: 'Möchten Sie wirklich alle Entwürfe löschen?',
      ua: 'Ви впевнені, що хочете видалити всі чернетки?',
      ru: 'Вы уверены, что хотите удалить все черновики?',
      zh: '确定要删除所有草稿吗？',
      hi: 'क्या आप वाकई सभी ड्राफ्ट हटाना चाहते हैं?',
      ar: 'هل أنت متأكد أنك تريد حذف جميع المسودات؟',
      he: 'האם אתה בטוח שברצונך למחוק את כל הטיוטות?'
    },
    historyTitle: {
      pl: 'Historia diet pacjenta',
      en: 'Patient diet history',
      es: 'Historial de dietas del paciente',
      fr: 'Historique des régimes du patient',
      de: 'Diätverlauf des Patienten',
      ua: 'Історія дієт пацієнта',
      ru: 'История диет пациента',
      zh: '患者饮食历史',
      hi: 'मरीज की डाइट का इतिहास',
      ar: 'تاريخ حميات المريض',
      he: 'היסטוריית תפריטים של המטופל'
    },
    seeHistory: {
      pl: '📚 Zobacz historię',
      en: '📚 View history',
      es: '📚 Ver historial',
      fr: '📚 Voir l’historique',
      de: '📚 Verlauf anzeigen',
      ua: '📚 Переглянути історію',
      ru: '📚 Посмотреть историю',
      zh: '📚 查看历史',
      hi: '📚 इतिहास देखें',
      ar: '📚 عرض السجل',
      he: '📚 הצג היסטוריה'
    },
    noHistory: {
      pl: 'Brak zapisanych diet.',
      en: 'No saved diets.',
      es: 'No hay dietas guardadas.',
      fr: 'Aucun régime enregistré.',
      de: 'Keine gespeicherten Diäten.',
      ua: 'Немає збережених дієт.',
      ru: 'Сохранённых диет нет.',
      zh: '没有保存的饮食计划。',
      hi: 'कोई सहेजी गई डाइट नहीं है।',
      ar: 'لا توجد حميات محفوظة.',
      he: 'אין תפריטים שמורים.'
    },
    dietLabel: {
      pl: 'Dieta',
      en: 'Diet',
      es: 'Dieta',
      fr: 'Régime',
      de: 'Diät',
      ua: 'Дієта',
      ru: 'Диета',
      zh: '饮食',
      hi: 'डाइट',
      ar: 'حمية',
      he: 'תפריט'
    },
    patientLabel: {
      pl: 'Pacjent',
      en: 'Patient',
      es: 'Paciente',
      fr: 'Patient',
      de: 'Patient',
      ua: 'Пацієнт',
      ru: 'Пациент',
      zh: '患者',
      hi: 'मरीज',
      ar: 'المريض',
      he: 'מטופל'
    },
    goal: {
      pl: 'Cel diety',
      en: 'Diet goal',
      es: 'Objetivo de la dieta',
      fr: 'Objectif du régime',
      de: 'Diätziel',
      ua: 'Мета дієти',
      ru: 'Цель диеты',
      zh: '饮食目标',
      hi: 'डाइट लक्ष्य',
      ar: 'هدف النظام الغذائي',
      he: 'מטרת התפריט'
    },
    cuisine: {
      pl: 'Kuchnia świata',
      en: 'World cuisine',
      es: 'Cocina del mundo',
      fr: 'Cuisine du monde',
      de: 'Weltküche',
      ua: 'Кухня світу',
      ru: 'Мировая кухня',
      zh: '世界美食',
      hi: 'विश्व भोजन शैली',
      ar: 'مطبخ عالمي',
      he: 'מטבח עולמי'
    },
    model: {
      pl: 'Model AI',
      en: 'AI model',
      es: 'Modelo de IA',
      fr: 'Modèle IA',
      de: 'KI-Modell',
      ua: 'Модель ШІ',
      ru: 'Модель ИИ',
      zh: 'AI模型',
      hi: 'एआई मॉडल',
      ar: 'نموذج الذكاء الاصطناعي',
      he: 'מודל בינה מלאכותית'
    },
    selectLanguage: {
      pl: 'Wybierz język',
      en: 'Select language',
      es: 'Seleccionar idioma',
      fr: 'Choisir la langue',
      de: 'Sprache auswählen',
      ua: 'Виберіть мову',
      ru: 'Выберите язык',
      zh: '选择语言',
      hi: 'भाषा चुनें',
      ar: 'اختر اللغة',
      he: 'בחר שפה'
    },
    selectDietGoal: {
      pl: "Cel diety",
      en: "Diet goal",
      ua: "Мета дієти",
      es: "Objetivo de la dieta",
      fr: "Objectif diététique",
      de: "Ernährungsziel",
      ru: "Цель диеты",
      zh: "饮食目标",
      hi: "आहार लक्ष्य",
      ar: "هدف النظام الغذائي",
      he: "מטרת הדיאטה"
    },
    selectCuisine: {
      pl: "Kuchnia świata",
      en: "World cuisine",
      ua: "Кухня світу",
      es: "Cocina mundial",
      fr: "Cuisine du monde",
      de: "Weltküche",
      ru: "Мировая кухня",
      zh: "世界美食",
      hi: "विश्व व्यंजन",
      ar: "مأكولات عالمية",
      he: "מטבח עולמי"
    },    
    sselectModel: {
      pl: "Model diety",
      en: "Diet model",
      ua: "Модель дієти",
      es: "Modelo de dieta",
      fr: "Modèle de régime",
      de: "Ernährungsmodell",
      ru: "Модель питания",
      zh: "饮食模型",
      hi: "आहार मॉडल",
      ar: "نموذج النظام الغذائي",
      he: "מודל תזונה"
  },
};