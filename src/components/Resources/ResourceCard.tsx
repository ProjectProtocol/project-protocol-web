import { ChainModifiers, Entry } from 'contentful'
import { ResourceLinkSkeleton } from 'src/types/contentful-types'
import CategoryPill from './CategoryPill'
import { Card } from 'react-bootstrap'
import { ResourceTagId, resourceTagLabelMap } from './resourceTagLabelMap'

export default function ResourceCard({
  resource,
}: {
  resource: Entry<ResourceLinkSkeleton, ChainModifiers, string>
  index: number
}) {
  const url = resource.fields.url as string
  const title = resource.fields.title as string
  const organization = resource.fields.organization as string
  const description = resource.fields.description as string

  const tagLabels: string[] = resource.metadata.tags.map(
    (t) => resourceTagLabelMap[t.sys.id as ResourceTagId],
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
            className="fs-3 fw-semibold lh-1 mb-0 d-block"
          >
            {title}
          </a>
          <div className="text-dark small text-break">{url}</div>
        </div>
      </div>
      <p className="mb-3">{description ? description : organization}</p>
      <div className="d-flex flex-row flex-wrap gap-1">
        {tagLabels.map((tagLabel: string) => (
          <CategoryPill
            key={`resource-${resource.sys.id}-${tagLabel}`}
            active={true}
            label={tagLabel}
          />
        ))}
      </div>
    </Card>
  )
}
