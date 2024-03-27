import CategoryPill from './CategoryPill'
import { Card } from 'react-bootstrap'
import Resource, { ResourceTag } from 'src/types/Resource'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import { truncate } from 'lodash-es'
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { like, dislike } from 'src/api/resources'
import SearchMeta from 'src/types/SearchMeta'

type Page<T> = {
  data: T[]
  meta: SearchMeta
}

export default function ResourceCard({
  resource,
  queryKey,
}: {
  resource: Resource
  index: number
  queryKey: string[]
}) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const {
    url,
    name,
    description,
    tagList,
    street,
    city,
    state,
    zip,
    phone,
    email,
    isOnline,
    isCurrentUserLiked,
    isCurrentUserDisliked,
  } = resource
  const [expanded, setExpanded] = useState(false)
  const locationLabel = isOnline
    ? 'Online'
    : city && state
    ? `${city}, ${state}`
    : null

  const addressLabel = useMemo(() => {
    if (street && city && state && zip) {
      return [street, city, state, zip].join(', ')
    }
  }, [street, city, state, zip])

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
    <Card body>
      <div className="vertical-rhythm-sm">
        <div className="d-flex flex-row align-items-top">
          <div
            className="bg-white d-flex justify-content-center align-items-center rounded rounded-circle border me-2"
            style={{ width: '30px', height: '30px', padding: '6px' }}
          >
            <img
              src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`}
            />
          </div>
          <div className="flex flex-column">
            <a
              href={url}
              target="_blank"
              className="fs-3 fw-semibold d-block link-cobalt"
            >
              {name}
            </a>
            <div className="text-dark small text-break">{url}</div>
            {locationLabel && (
              <div className="d-flex flex-row">
                <i className="bi bi-geo-alt-fill me-1 text-dark small" />
                <span className="small">{locationLabel}</span>
              </div>
            )}
          </div>
        </div>
        <p>
          {expanded ? description : truncate(description, { length: 100 })}
          <a
            onClick={() => setExpanded(!expanded)}
            className="ms-1"
            role="button"
          >
            {expanded ? 'Say less' : 'Say more'}
          </a>
        </p>
        <div className="d-flex flex-column gap-1">
          {addressLabel && (
            <a
              href={`https://maps.google.com/?q=${addressLabel}`}
              target="_blank"
            >
              {addressLabel}
            </a>
          )}
          {phone && <a href={`tel:+1${phone}`}>{phone}</a>}
          {email && <a href={`mailto:${email}`}>{email}</a>}
        </div>
        <div className="d-flex flex-row flex-wrap gap-2">
          {tagList.map((tag: ResourceTag, i: number) => (
            <CategoryPill
              key={`resource-${i}-${tag}`}
              active={true}
              label={t(`resources.tags.${tag}`)}
            />
          ))}
        </div>
        <div className="d-flex flex-row flex-wrap gap-2 align-items-center">
          <div className="d-flex flex-row gap-1">
            <span>{resource.votesUp}</span>
            <i
              className={`bi me-1 align-middle bi-hand-thumbs-up${
                isCurrentUserLiked ? '-fill' : ''
              }`}
              role="button"
              onClick={() => likeMutation.mutate()}
            />
          </div>
          <div className="d-flex flex-row gap-1">
            <span>{resource.votesDown}</span>
            <i
              className={`bi me-1 align-middle bi-hand-thumbs-down${
                isCurrentUserDisliked ? '-fill' : ''
              }`}
              role="button"
              onClick={() => dislikeMutation.mutate()}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
