import CategoryPill from './CategoryPill'
import { Card } from 'react-bootstrap'
import Resource, { ResourceTag } from 'src/types/Resource'
import { useTranslation } from 'react-i18next'

export default function ResourceCard({
  resource,
}: {
  resource: Resource
  index: number
}) {
  const { t } = useTranslation()
  const { url, name, description, tagList } = resource

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
            {name}
          </a>
          <div className="text-dark small text-break">{url}</div>
        </div>
      </div>
      <p className="mb-3">{description}</p>
      <div className="d-flex flex-row flex-wrap gap-2">
        {tagList.map((tag: ResourceTag, i: number) => (
          <CategoryPill
            key={`resource-${i}-${tag}`}
            active={true}
            label={t(`resources.tags.${tag}`)}
          />
        ))}
      </div>
    </Card>
  )
}
