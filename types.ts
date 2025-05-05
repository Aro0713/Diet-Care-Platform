export type Ingredient = {
  product: string;
  weight: number;
};

export type Meal = {
  name: string;
  ingredients: Ingredient[];
  calories: number;
  glycemicIndex: number;
  errors?: string[]; // błędy walidacyjne
};

export type TestResult = {
  name: string;
  value: string;
};

export type MedicalData = {
  condition: string;
  tests: TestResult[];
};

export interface PatientData {
  age: number;
  gender: string;
  weight: number;
  height: number;
  allergies?: string;
  region?: string;
  conditions: string[];
  medical: MedicalData[];
}
