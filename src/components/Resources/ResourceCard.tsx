import { ChainModifiers, Entry } from 'contentful'
import {
  ResourceCategoryType,
  ResourceLinkSkeleton,
} from 'src/types/contentful-types'
import CategoryPill from './CategoryPill'
import { Card } from 'react-bootstrap'

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
  const category = (
    resource.fields.category as string[]
  )[0] as ResourceCategoryType

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
            className="h3 link-secondary mb-0 d-block"
          >
            {title}
          </a>
          <div className="text-tertiary small text-break">{url}</div>
        </div>
      </div>
      <p className="text-tertiary mb-3">
        {description ? description : organization}
      </p>
      <CategoryPill active={true} label={category} />
    </Card>
  )
}
