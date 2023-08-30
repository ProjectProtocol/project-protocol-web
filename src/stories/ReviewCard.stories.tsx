import type { Meta, StoryObj } from '@storybook/react'

import ReviewCard from 'src/components/ReviewCard'
import { Review } from 'src/types/Review'

const meta: Meta<typeof ReviewCard> = {
  title: 'Atoms/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ReviewCard>

const review: Review = {
  id: 216,
  ratings: [
    {
      label: 'Helpful',
      value: 2,
    },
    {
      label: 'Caring',
      value: 4,
    },
    {
      label: 'Respectful',
      value: 2,
    },
    {
      label: 'Availability',
      value: 3,
    },
  ],
  reviewInput: 'Okey-dokey',
  overallRating: 2.8,
  tags: [
    {
      name: 'Works around my schedule',
      translations: {
        en: 'Works around my schedule',
        es: 'Spanish for Works around my schedule',
      },
      type: 'Tag',
    },
    {
      name: 'Trauma-informed',
      translations: {
        en: 'Trauma-informed',
        es: 'Spanish for Trauma-informed',
      },
      type: 'Tag',
    },
    {
      name: 'Unresponsive',
      translations: {
        en: 'Unresponsive',
        es: 'Spanish for Unresponsive',
      },
      type: 'Tag',
    },
  ],
  type: 'Review',
}

export const Basic: Story = {
  args: { review },
}
