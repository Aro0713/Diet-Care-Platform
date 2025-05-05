import React from 'react'

interface Props {
  data: {
    mealsPerDay: string
    mealTimes: string
    snacking: string
    breakfast: string
    sweets: string
    water: string
    processedFood: string
    cookingHabits: string
    foodFrequencies: string
  }
  onChange: (field: string, value: string) => void
}

export default function SectionFoodHabits({ data, onChange }: Props) {
  return (
    <div className='space-y-4 mt-6'>
      <h3 className='text-lg font-bold'>Nawyki żywieniowe</h3>

      <div>
        <label className='block font-semibold'>Ile posiłków dziennie Pani/Pan spożywa?</label>
        <input
          type='text'
          className='w-full border px-2 py-1'
          value={data.mealsPerDay}
          onChange={(e) => onChange('mealsPerDay', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>O jakich porach dnia najczęściej Pani/Pan je?</label>
        <input
          type='text'
          className='w-full border px-2 py-1'
          value={data.mealTimes}
          onChange={(e) => onChange('mealTimes', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Czy często podjada Pani/Pan między posiłkami?</label>
        <input
          type='text'
          className='w-full border px-2 py-1'
          value={data.snacking}
          onChange={(e) => onChange('snacking', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Czy spożywa Pani/Pan regularnie śniadania?</label>
        <input
          type='text'
          className='w-full border px-2 py-1'
          value={data.breakfast}
          onChange={(e) => onChange('breakfast', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Jak często sięga Pani/Pan po słodycze, fast-foody?</label>
        <input
          type='text'
          className='w-full border px-2 py-1'
          value={data.sweets}
          onChange={(e) => onChange('sweets', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Ile wody Pani/Pan wypija dziennie? Jakie inne napoje?</label>
        <input
          type='text'
          className='w-full border px-2 py-1'
          value={data.water}
          onChange={(e) => onChange('water', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Jak często spożywa Pani/Pan żywność przetworzoną?</label>
        <input
          type='text'
          className='w-full border px-2 py-1'
          value={data.processedFood}
          onChange={(e) => onChange('processedFood', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Czy gotuje Pani/Pan w domu czy jada na mieście?</label>
        <input
          type='text'
          className='w-full border px-2 py-1'
          value={data.cookingHabits}
          onChange={(e) => onChange('cookingHabits', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Jak często spożywane są: nabiał, mięso, ryby, warzywa, tłuszcze?</label>
        <textarea
          className='w-full border px-2 py-1'
          value={data.foodFrequencies}
          onChange={(e) => onChange('foodFrequencies', e.target.value)}
        />
      </div>
    </div>
  )
}
