import React from 'react';

interface Props {
  onChange: (value: string) => void;
}

const models: string[] = [
  'Dieta cukrzycowa',
  'Dieta w insulinooporności',
  'Dieta w nadciśnieniu (DASH)',
  'Dieta w chorobach tarczycy',
  'Dieta w chorobach nerek',
  'Dieta w chorobach wątroby',
  'Dieta w chorobach trzustki',
  'Dieta w chorobie refluksowej',
  'Dieta w celiakii (bezglutenowa)',
  'Dieta bezlaktozowa',
  'Dieta FODMAP (przy IBS)',
  'Dieta łatwostrawna',
  'Dieta w chorobach nowotworowych',
  'Dieta przy dnie moczanowej',
  'Dieta w osteoporozie',
  'Dieta przeciwmiażdżycowa',
  'Dieta przeciwalergiczna',
  'Dieta ketogeniczna (terapeutyczna)',
  'Dieta bezglutenowa',
  'Dieta bezlaktozowa',
  'Dieta bezmleczna',
  'Dieta bezjajeczna',
  'Dieta bezhistaminowa',
  'Dieta low FODMAP',
  'Dieta wegańska',
  'Dieta wegetariańska',
];

export default function SelectModelForm({ onChange }: Props) {
  return (
    <div className='mt-4'>
      <label className='block font-semibold mb-1'>Wybierz model diety:</label>
      <select
        className='w-full border px-2 py-1'
        defaultValue=""
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Wybierz model --</option>
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
}
