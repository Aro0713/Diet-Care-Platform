import React from 'react'

interface Props {
  selectedGoals: string[]
  setSelectedGoals: (goals: string[]) => void
}

const goalOptions = [
  'Odchudzające (redukcyjne)',
  'Na masę',
  'Stabilizujące wagę',
  'Detoksykacyjne / oczyszczające',
  'Regeneracyjne',
  'Przeciwzapalne',
  'Poprawa pracy wątroby',
  'Poprawa pracy nerek',
  'Wzmacnianie odporności',
  'Wsparcie układu nerwowego',
  'Poprawa skóry, włosów i paznokci',
  'Wsparcie płodności',
  'Diety sportowe',
  'Diety lecznicze (kliniczne)',
  'Diety eliminacyjne'
]

export default function SelectGoalForm({ selectedGoals, setSelectedGoals }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value)
    setSelectedGoals(options)
  }

  return (
    <div className='mt-4'>
      <label className='block font-semibold mb-1'>Wybierz cele diety:</label>
      <select
        multiple
        className='w-full border px-2 py-1'
        value={selectedGoals}
        onChange={handleChange}
      >
        {goalOptions.map((goal) => (
          <option key={goal} value={goal}>
            {goal}
          </option>
        ))}
      </select>
    </div>
  )
}
