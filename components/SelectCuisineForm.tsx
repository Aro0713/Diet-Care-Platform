import React from 'react';

interface Props {
  onChange: (value: string) => void;
}

const cuisineOptions = [
  'Śródziemnomorska',
  'Japońska',
  'Chińska',
  'Tajska',
  'Wietnamska',
  'Indyjska',
  'Koreańska',
  'Bliskowschodnia',
  'Polska',
  'Francuska',
  'Włoska',
  'Hiszpańska',
  'Skandynawska',
  'Północnoamerykańska',
  'Brazylijska',
  'Afrykańska',
  'Dieta arktyczna / syberyjska',
];

export default function SelectCuisineForm({ onChange }: Props) {
  return (
    <div className="mt-4">
      <label className="block font-semibold mb-1">Wybierz kuchnię świata:</label>
      <select
        className="w-full border px-2 py-1"
        defaultValue=""
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Wybierz kuchnię --</option>
        {cuisineOptions.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </div>
  );
}
