import React, { useState } from 'react';
import { isWithinNormalRange } from '../utils/isWithinNormalRange';
import { translationsUI } from '../utils/translations';
import { LangKey } from '../utils/i18n';

export interface LabTest {
  name: string;
  unit: string;
  normalRange: string;
}

interface Props {
  test: LabTest;
  lang: LangKey;
  onChange?: (value: number | null) => void;
}

export default function LabTestInput({ test, lang, onChange }: Props) {
  const [value, setValue] = useState<string>('');

  const parsedValue = parseFloat(value.replace(',', '.'));
  const result = isWithinNormalRange(parsedValue, test.normalRange);

  const t = (key: keyof typeof translationsUI) =>
    translationsUI[key]?.[lang] ?? translationsUI[key]?.pl ?? key;

  let statusClass = 'text-gray-600';
  let statusIcon = '❔';

  if (value && !isNaN(parsedValue)) {
    if (result === true) {
      statusClass = 'text-green-600';
      statusIcon = '✅';
    } else if (result === false) {
      statusClass = 'text-red-600';
      statusIcon = '❌';
    } else {
      statusClass = 'text-yellow-600';
      statusIcon = '⚠️';
    }
  }

  return (
    <div className="mb-4 space-y-1">
      <label className="block font-semibold">
        {test.name} <span className="text-sm text-gray-500">({test.unit})</span>
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (onChange) {
            const num = parseFloat(e.target.value.replace(',', '.'));
            onChange(isNaN(num) ? null : num);
          }
        }}
        className="w-full border px-2 py-1 rounded"
        placeholder={`Zakres: ${test.normalRange}`}
      />

      <div className={`text-sm font-medium ${statusClass}`}>
        {value && !isNaN(parsedValue) && (
          <>
            {statusIcon}{' '}
            {result === true
              ? t('normalResult')
              : result === false
              ? t('abnormalResult')
              : t('unknownRange')}
          </>
        )}
      </div>
    </div>
  );
}
