import type { Meta, StoryObj } from '@storybook/react'
import RatingRadio from 'src/components/RatingRadio'
import { useArgs } from '@storybook/preview-api'

const meta: Meta<typeof RatingRadio> = {
  tags: ['autodocs'],
  title: 'Components/RatingRadio',
  component: RatingRadio,
  decorators: [
    function Component(Story, ctx) {
      const [, setArgs] = useArgs()
      const onChange = (value: number) => {
        setArgs({ currentValue: value })
      }

      return (
        <div style={{ maxWidth: 600 }}>
          <Story args={{ ...ctx.args, onChange }} />
        </div>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof RatingRadio>

export const Basic: Story = {
  args: {
    title: 'Help',
    titleHelper: 'Brief description',
    helperLeft: 'Lowest value description',
    helperRight: 'Highest value description',
  },
}

/** If an errorMessage is provided, title and error message are shown in red. */
export const Error: Story = {
  args: {
    title: 'Help',
    titleHelper: 'Brief description',
    helperLeft: 'Lowest value description',
    helperRight: 'Highest value description',
    errorMessage: "Please provide a 'Help' rating",
  },
}
