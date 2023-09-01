import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import RatingRadio from 'src/components/RatingRadio'

/** Form element allowing user to provide a 1-to-5 rating */
const meta: Meta<typeof RatingRadio> = {
  tags: ['autodocs'],
  title: 'Components/RatingRadio',
  component: RatingRadio,
}

export default meta

type Story = StoryObj<typeof RatingRadio>

export const Basic: Story = {
  render: () => {
    const [currentValue, setCurrentValue] = useState<number>()
    return (
      <>
        <RatingRadio
          containerClass="mb-5"
          currentValue={currentValue}
          onChange={setCurrentValue}
          title="Helpful"
          titleHelper={`
          How helpful has this parole officer 
          been during your reentry process. 
          For example, do they connect you to 
          necessary resources?
        `}
          helperLeft="Not helpful at all"
          helperRight="Almost too helpful"
        />
        <p className="p-3 bg-light border">
          Current value:{' '}
          <pre className="d-inline ms-2">
            {currentValue || '[none selected]'}
          </pre>
        </p>
      </>
    )
  },
}
