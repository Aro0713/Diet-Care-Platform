import React from "react";

type Props = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

const foodPreferences = [
  "wegetariańska",
  "wegańska",
  "bezglutenowa",
  "bezlaktozowa",
  "niskowęglowodanowa",
  "wysokobiałkowa"
];

export const SelectFoodForm: React.FC<Props> = ({ selected, onChange }) => {
  const toggle = (food: string) => {
    const updated = selected.includes(food)
      ? selected.filter((f) => f !== food)
      : [...selected, food];
    onChange(updated);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Preferencje żywieniowe
      </label>
      <div className="flex flex-wrap gap-2">
        {foodPreferences.map((food) => (
          <button
            key={food}
            type="button"
            onClick={() => toggle(food)}
            className={`px-3 py-1 rounded border ${
              selected.includes(food) ? "bg-green-100 border-green-500" : "bg-white"
            }`}
          >
            {food}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectFoodForm;
