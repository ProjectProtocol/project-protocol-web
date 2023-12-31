import type { Meta, StoryObj } from '@storybook/react'
import RatingBar from 'src/components/RatingBar'

const meta: Meta<typeof RatingBar> = {
  title: 'Atoms/RatingBar',
  component: RatingBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RatingBar>

export const Integer: Story = {
  args: {
    rating: { label: 'Caring', value: 2 },
  },
}

export const Decimal: Story = {
  args: {
    rating: { label: 'Caring', value: 3.5 },
  },
}

export const Animated: Story = {
  args: {
    rating: { label: 'Caring', value: 4 },
    animated: true,
    delay: 1,
  },
}
