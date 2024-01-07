import { ChainModifiers, Entry } from 'contentful'
import { ResourceLinkSkeleton } from 'src/types/contentful-types'
import CategoryPill from './CategoryPill'
import { Card } from 'react-bootstrap'
import { ResourceTagId, resourceTagLabelMap } from './resourceTagLabelMap'
import { useRollbar } from '@rollbar/react'

export default function ResourceCard({
  resource,
}: {
  resource: Entry<ResourceLinkSkeleton, ChainModifiers, string>
  index: number
}) {
  const rollbar = useRollbar()
  const url = resource.fields.url as string
  const title = resource.fields.title as string
  const organization = resource.fields.organization as string
  const description = resource.fields.description as string

  const tagLabels: { label: string; id: string }[] = resource.metadata.tags.map(
    (t) => {
      const label = resourceTagLabelMap[t.sys.id as ResourceTagId]
      const id = t.sys.id

      if (!label) {
        rollbar.error('Unknown tag found on resource', {
          tagId: t.sys.id,
        })
      }

      return { label, id }
    },
  )

  return (
    <Card body>
      <div className="d-flex flex-row align-items-top mb-3">
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
            className="fs-3 fw-semibold lh-1 mb-0 d-block link-cobalt"
          >
            {title}
          </a>
          <div className="text-dark small text-break">{url}</div>
        </div>
      </div>
      <p className="mb-3">{description ? description : organization}</p>
      <div className="d-flex flex-row flex-wrap gap-2">
        {tagLabels.map(({ label, id }: { label: string; id: string }) => (
          <CategoryPill
            key={`resource-${resource.sys.id}-${label}`}
            href={`?category=${id}`}
            active={true}
            label={label}
          />
        ))}
      </div>
    </Card>
  )
}
