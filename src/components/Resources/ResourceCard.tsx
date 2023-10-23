import { ChainModifiers, Entry } from 'contentful'
import ListItem from '../List/ListItem'
import { Badge, Card } from 'react-bootstrap'
import { ResourceLinkSkeleton } from 'src/types/contentful-types'
import { useEffect, useState } from 'react'
import apiClient from 'src/api/client'
import icon from '../../images/icon.svg'
import resourceCategoryColor from 'src/util/resourceCategoryColor'
import ResourceImagePlacholder from './ResourceImagePlaceholder'

export default function ResourceCard({
  resource,
}: {
  resource: Entry<ResourceLinkSkeleton, ChainModifiers, string>
  index: number
}) {
  const [previewImg, setPreviewImg] = useState<string>()
  const url = resource.fields.url as string
  const title = resource.fields.title as string
  const organization = resource.fields.organization as string
  const category = (resource.fields.category as string[])[0]

  useEffect(() => {
    let ignore = false
    if (!previewImg && !ignore)
      apiClient.get('/resource_link_preview?url=' + url).then(({ data }) => {
        if (data?.images && data.images[0]?.src) {
          setPreviewImg(data.images[0]?.src)
        } else {
          setPreviewImg(icon)
        }
      })
    return () => {
      ignore = true
    }
  }, [previewImg, url])

  return (
    <ListItem onClick={() => window.open(url, '_blank')}>
      {previewImg ? (
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={previewImg}
            width="100%"
            className="bg-dark"
            style={{ maxHeight: '200px', objectFit: 'cover' }}
          />
          <Badge
            pill
            className={`p-2 position-absolute ${resourceCategoryColor(
              category,
            )}`}
            style={{
              right: '0.5rem',
              top: '0.5rem',
            }}
          >
            <span className="fw-medium">{category}</span>
          </Badge>
        </div>
      ) : (
        <ResourceImagePlacholder />
      )}

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{organization}</Card.Text>
      </Card.Body>
    </ListItem>
  )
}
