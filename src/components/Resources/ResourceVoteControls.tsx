import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import classNames from 'classnames'
import { dislike, like } from 'src/api/resources'
import Resource from 'src/types/Resource'
import { Page } from 'src/types/SearchMeta'

export default function ResourceVoteControls({
  resource,
  queryKey,
}: {
  resource: Resource
  queryKey: string[]
}) {
  const queryClient = useQueryClient()

  function updateResourceInList({ resource }: { resource: Resource }) {
    const newResource = resource
    queryClient.setQueryData(queryKey, (prev: InfiniteData<Page<Resource>>) => {
      const newPages = prev.pages.map((page) => {
        const newData = page.data.map((r) =>
          r.id === newResource.id ? { ...r, ...newResource } : r,
        )
        return { data: newData, meta: page.meta }
      })
      return { ...prev, pages: newPages }
    })
  }

  const likeMutation = useMutation({
    mutationFn: () => like(resource.id),
    onSuccess: updateResourceInList,
  })

  const dislikeMutation = useMutation({
    mutationFn: () => dislike(resource.id),
    onSuccess: updateResourceInList,
  })

  return (
    <div className="d-flex flex-row flex-wrap gap-2 align-items-center">
      <div
        className={classNames('d-flex flex-row gap-1', {
          'text-light-cobalt': resource.isCurrentUserLiked,
        })}
      >
        <span>{resource.votesUp}</span>
        <i
          className={`bi me-1 align-middle bi-hand-thumbs-up${
            resource.isCurrentUserLiked ? '-fill' : ''
          }`}
          role="button"
          onClick={() => likeMutation.mutate()}
        />
      </div>
      <div
        className={classNames('d-flex flex-row gap-1', {
          'text-rating-1': resource.isCurrentUserDisliked,
        })}
      >
        <span>{resource.votesDown}</span>
        <i
          className={`bi me-1 align-middle bi-hand-thumbs-down${
            resource.isCurrentUserDisliked ? '-fill' : ''
          }`}
          role="button"
          onClick={() => dislikeMutation.mutate()}
        />
      </div>
    </div>
  )
}
