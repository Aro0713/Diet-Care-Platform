import React from 'react'

interface Props {
  data: {
    digestiveIssues: string
    bowelFrequency: string
    diagnosedConditions: string
  }
  onChange: (field: string, value: string) => void
}

export default function SectionDigestion({ data, onChange }: Props) {
  return (
    <div className='space-y-4 mt-6'>
      <h3 className='text-lg font-bold'>Problemy trawienne i jelitowe</h3>

      <div>
        <label className='block font-semibold'>Czy często występują: wzdęcia, zaparcia, biegunki, refluks, bóle brzucha?</label>
        <textarea
          className='w-full border px-2 py-1'
          value={data.digestiveIssues}
          onChange={(e) => onChange('digestiveIssues', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Jak często się Pani/Pan wypróżnia?</label>
        <input
          className='w-full border px-2 py-1'
          value={data.bowelFrequency}
          onChange={(e) => onChange('bowelFrequency', e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold'>Czy były diagnozowane choroby jelit? (IBS, SIBO, celiakia...)</label>
        <textarea
          className='w-full border px-2 py-1'
          value={data.diagnosedConditions}
          onChange={(e) => onChange('diagnosedConditions', e.target.value)}
        />
      </div>
    </div>
  )
}
