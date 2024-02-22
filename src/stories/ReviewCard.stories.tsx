import type { Meta, StoryObj } from '@storybook/react'
import ReviewCard from 'src/components/ReviewCard'
import { Review } from 'src/types/Review'

const meta: Meta<typeof ReviewCard> = {
  title: 'Components/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ReviewCard>

const review = {
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
  comment: {
    body: 'This is an example comment. Additional comments can contain harmful information so we have introduced a moderation process to protect the community.',
    status: 'published',
    type: 'Comment',
  },
  overallRating: 2.8,
  tags: [
    {
      name: 'Works around my schedule',
    },
    {
      name: 'Trauma-informed',
    },
    {
      name: 'Unresponsive',
    },
  ],
  type: 'Review',
} as Review

const defaultArgs = {
  review,
  showModerationModal: () => alert("Pretend I'm a modal"),
}

/**
 * When a review has a comment and is published.
 */
export const Basic: Story = {
  args: defaultArgs,
}

/** When a review has a comment but is unpublished (only the author can see this). */
export const UnpublishedComment: Story = {
  args: {
    ...defaultArgs,
    review: {
      ...review,
      comment: {
        ...review.comment,
        body: review.comment?.body || '',
        status: 'unpublished',
        type: 'Comment',
      },
    },
  },
}

/** When a review has no comment, none of "Additional comments" UI is shown. */
export const NoComment: Story = {
  args: {
    ...defaultArgs,
    review: { ...review, comment: null },
  },
}
