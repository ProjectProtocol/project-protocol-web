import CategoryPill from './CategoryPill'
import { Card } from 'react-bootstrap'
import Resource, { ResourceTag } from 'src/types/Resource'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

export default function ResourceCard({
  resource,
}: {
  resource: Resource
  index: number
}) {
  const { t } = useTranslation()
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
  } = resource
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
      <p className="mb-3">{description}</p>
      <div className="mb-3 d-flex flex-column gap-1">
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
    </Card>
  )
}
