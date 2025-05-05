import React from 'react'

interface Props {
  data: {
    activity: string
    sleep: string
    stress: string
    smoking: string
    alcohol: string
    caffeine: string
  }
  onChange: (field: string, value: string) => void
}

export default function SectionLifestyle({ data, onChange }: Props) {
  return (
    <div className='space-y-4 mt-6'>
      <h3 className='text-lg font-bold'>Styl życia i nawyki</h3>

      <div>
        <label className='block font-semibold'>Aktywność fizyczna (rodzaj, częstotliwość, czas trwania):</label>
        <textarea
          className='w-full border px-2 py-1'
          value={data.activity}
          onChange={(e) => onChange('activity', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Sen – ile godzin, jakość:</label>
        <textarea
          className='w-full border px-2 py-1'
          value={data.sleep}
          onChange={(e) => onChange('sleep', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Poziom stresu na co dzień:</label>
        <textarea
          className='w-full border px-2 py-1'
          value={data.stress}
          onChange={(e) => onChange('stress', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Palenie papierosów:</label>
        <input
          type='text'
          className='w-full border px-2 py-1'
          value={data.smoking}
          onChange={(e) => onChange('smoking', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Alkohol (jak często, ile?):</label>
        <input
          type='text'
          className='w-full border px-2 py-1'
          value={data.alcohol}
          onChange={(e) => onChange('alcohol', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Napoje z kofeiną (kawa, herbata, energetyki):</label>
        <input
          type='text'
          className='w-full border px-2 py-1'
          value={data.caffeine}
          onChange={(e) => onChange('caffeine', e.target.value)}
        />
      </div>
    </div>
  )
}
