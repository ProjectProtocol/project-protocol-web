import type { Meta, StoryObj } from '@storybook/react'
import RatingRadio from 'src/components/RatingRadio'
import { useArgs } from '@storybook/preview-api'

/** Form element allowing user to provide a 1-to-5 rating */
const meta: Meta<typeof RatingRadio> = {
  tags: ['autodocs'],
  title: 'Components/RatingRadio',
  component: RatingRadio,
  decorators: [
    function Component(Story, ctx) {
      const [, setArgs] = useArgs()
      const onChange = (value: number) => {
        console.log('wee')

        setArgs({ currentValue: value })
      }

      return <Story args={{ ...ctx.args, onChange }} />
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
