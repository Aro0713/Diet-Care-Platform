"use strict";(()=>{var e={};e.id=901,e.ids=[901],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},2079:e=>{e.exports=import("openai")},1931:(e,t,a)=>{a.a(e,async(e,n)=>{try{a.r(t),a.d(t,{config:()=>c,default:()=>d,routeModule:()=>u});var r=a(1802),s=a(7153),i=a(6249),o=a(1444),l=e([o]);o=(l.then?(await l)():l)[0];let d=(0,i.l)(o,"default"),c=(0,i.l)(o,"config"),u=new r.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/generate-diet",pathname:"/api/generate-diet",bundlePath:"",filename:""},userland:o});n()}catch(e){n(e)}})},1444:(e,t,a)=>{a.a(e,async(e,n)=>{try{a.r(t),a.d(t,{default:()=>handler});var r=a(2079),s=e([r]);r=(s.then?(await s)():s)[0];let i=new r.OpenAI({apiKey:process.env.OPENAI_API_KEY}),o={pl:"polski",en:"English",es:"espanol",fr:"fran\xe7ais",de:"Deutsch",ua:"??????????",ru:"???????",zh:"??",hi:"??????",ar:"???????",he:"?????"};async function handler(e,t){if("POST"!==e.method)return t.status(405).json({error:"Only POST requests are allowed"});let{form:a,interviewData:n,lang:r="pl"}=e.body,{age:s,sex:l,weight:d,height:c,allergies:u,region:p,medical:m}=a,{goal:y,cuisine:g,model:h,lifestyle:f,mealsPerDay:w,goals:x,...A}=n,P=d&&c?parseFloat((d/(c/100)**2).toFixed(1)):null,_=o[r]||"polski",b={...a,...n,bmi:P,language:_},k=`
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
- All content (meal names, products, units) must be written in: ${_}.
- Return JSON only — no explanation, no markdown, no notes.

?? Patient data:
${JSON.stringify(b,null,2)}
`;try{let e;let a=await i.chat.completions.create({model:"gpt-4",messages:[{role:"user",content:k}],temperature:.7,max_tokens:3e3}),n=a.choices[0]?.message?.content||"";if(console.log("?? rawText:",n),!n||n.length<100||!n.includes("{")||!n.includes("name")||!n.includes("calories"))return console.warn("?? Nieprawidłowa lub zbyt kr\xf3tka odpowiedź z OpenAI."),t.status(500).json({error:"Nieprawidłowa odpowiedź z AI – brak danych diety."});try{e=JSON.parse(n),console.log("? parsed diet:",e)}catch(e){return console.error("? Błąd parsowania JSON:",n),t.status(500).json({error:"Nie udało się sparsować diety z AI."})}let r=(e=>{let t={name:"",ingredients:[],calories:0,glycemicIndex:0};for(let a of["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"])for(e[a]||(e[a]=[]);e[a].length<3;)e[a].push({...t});return e})(e);return t.status(200).json({diet:r})}catch(e){return console.error("? Błąd OpenAI:",e.message||e),t.status(500).json({error:"Błąd generowania diety."})}}n()}catch(e){n(e)}})}};var t=require("../../webpack-api-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),a=t.X(0,[222],()=>__webpack_exec__(1931));module.exports=a})();