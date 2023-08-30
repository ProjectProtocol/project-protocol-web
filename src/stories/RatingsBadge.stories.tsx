import type { Meta, StoryObj } from '@storybook/react'
import RatingsBadge from 'src/components/RatingsBadge'

const meta: Meta<typeof RatingsBadge> = {
  title: 'Atoms/RatingsBadge',
  component: RatingsBadge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RatingsBadge>

export const Integer: Story = {
  args: {
    rating: 1,
  },
}

export const Decimal: Story = {
  args: {
    rating: 3.5,
  },
}
