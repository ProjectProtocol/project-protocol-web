import { render, fireEvent } from '@testing-library/react'
import ResourceVoteControls from 'src/components/Resources/ResourceVoteControls'
import Resource from 'src/types/Resource'

describe('ResourceVoteControls', () => {
  const resource = {
    votesUp: 0,
    votesDown: 0,
    isCurrentUserLiked: false,
    isCurrentUserDisliked: false,
  } as Resource

  it('should call onLike when the like button is clicked', () => {
    const onLikeMock = vitest.fn()
    const { getByTestId } = render(
      <ResourceVoteControls
        resource={resource}
        onLike={onLikeMock}
        onDislike={() => {}}
      />,
    )

    fireEvent.click(getByTestId('like-button'))

    expect(onLikeMock).toHaveBeenCalled()
  })

  it('should call onDislike when the dislike button is clicked', () => {
    const onDislikeMock = vitest.fn()
    const { getByTestId } = render(
      <ResourceVoteControls
        resource={resource}
        onLike={() => {}}
        onDislike={onDislikeMock}
      />,
    )

    fireEvent.click(getByTestId('dislike-button'))

    expect(onDislikeMock).toHaveBeenCalled()
  })

  it("displays the resource's likes count", () => {
    const { getByTestId } = render(
      <ResourceVoteControls
        resource={{ ...resource, votesUp: 10 }}
        onLike={() => {}}
        onDislike={() => {}}
      />,
    )

    expect(getByTestId('likes-count')).toHaveTextContent('10')
  })

  it("displays the resource's dislikes count", () => {
    const { getByTestId } = render(
      <ResourceVoteControls
        resource={{ ...resource, votesDown: 5 }}
        onLike={() => {}}
        onDislike={() => {}}
      />,
    )

    expect(getByTestId('dislikes-count')).toHaveTextContent('5')
  })

  it('shows a filled like button when the resource is liked by the current user', () => {
    const { getByTestId } = render(
      <ResourceVoteControls
        resource={{ ...resource, isCurrentUserLiked: true }}
        onLike={() => {}}
        onDislike={() => {}}
      />,
    )

    expect(getByTestId('like-button')).toHaveClass('bi-hand-thumbs-up-fill')
  })

  it('shows a filled dislike button when the resource is disliked by the current user', () => {
    const { getByTestId } = render(
      <ResourceVoteControls
        resource={{ ...resource, isCurrentUserDisliked: true }}
        onLike={() => {}}
        onDislike={() => {}}
      />,
    )

    expect(getByTestId('dislike-button')).toHaveClass(
      'bi-hand-thumbs-down-fill',
    )
  })
})
