import { render } from '@testing-library/react'
import '@testing-library/jest-dom' // for better matchers
import ReviewCard from 'src/components/ReviewCard'
import { Review } from 'src/types/Review'

const mockReview = {
  id: 123,
  ratings: [
    { label: 'Helpful', value: 4 },
    { label: 'Caring', value: 5 },
    { label: 'Respectful', value: 5 },
    { label: 'Availability', value: 5 },
  ],
  tags: [{ name: 'Communicative' }, { name: 'Supportive' }],
} as Review

const mockReviewWithPublishedComment = {
  ...mockReview,
  comment: { body: 'This is a test review', status: 'published' },
} as Review

const mockReviewWithUnpublishedComment = {
  ...mockReview,
  comment: { body: 'This is a test review', status: 'unpublished' },
} as Review

const mockShowModerationModal = vitest.fn()

describe('ReviewCard', () => {
  it('renders correctly with a review with no comment', () => {
    const { getByText, queryByText } = render(
      <ReviewCard
        review={mockReview}
        showModerationModal={mockShowModerationModal}
      />,
    )

    // Check if ratings are displayed
    expect(getByText('category.helpful.title')).toBeInTheDocument()
    expect(getByText('category.caring.title')).toBeInTheDocument()
    expect(getByText('category.respectful.title')).toBeInTheDocument()
    expect(getByText('category.availability.title')).toBeInTheDocument()

    // Check if tags are displayed
    expect(getByText('tags.values.communicative')).toBeInTheDocument()
    expect(getByText('tags.values.supportive')).toBeInTheDocument()

    // Check if the review input is displayed
    expect(queryByText('additionalComments')).not.toBeInTheDocument()
    expect(queryByText('This is a test review')).not.toBeInTheDocument()
  })

  it('renders correctly for a review with a comment', () => {
    const { queryByText } = render(
      <ReviewCard
        review={{
          ...mockReviewWithPublishedComment,
        }}
        showModerationModal={mockShowModerationModal}
      />,
    )

    // Check if the review input is displayed
    expect(queryByText('additionalComments')).toBeInTheDocument()
    expect(queryByText('This is a test review')).toBeInTheDocument()

    // Does not show the moderation box
    expect(queryByText('unpublishedCommentHeader')).not.toBeInTheDocument()
  })

  it('shows additional info around the unpublished comments (for users viewing their own comments)', () => {
    const { getByText } = render(
      <ReviewCard
        review={{
          ...mockReviewWithUnpublishedComment,
        }}
        showModerationModal={mockShowModerationModal}
      />,
    )

    // Click the moderation button
    expect(getByText('unpublishedCommentHeader')).toBeInTheDocument()

    const moderationButton = getByText('unpublishedCommentHeaderLink')
    moderationButton.click()

    expect(mockShowModerationModal).toHaveBeenCalled()
  })
})
