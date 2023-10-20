import { ChainModifiers, Entry } from 'contentful'
import ListItem from '../List/ListItem'
import { Card, Col, Placeholder, Row } from 'react-bootstrap'
import { ResourceLinkSkeleton } from 'src/types/contentful-types'
import { useEffect, useState } from 'react'
import apiClient from 'src/api/client'
import icon from '../../images/icon.svg'

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

  useEffect(() => {
    let ignore = false
    if (!previewImg && !ignore)
      apiClient.get('/resource_link_preview?url=' + url).then(({ data }) => {
        if (data?.images) {
          const imageSet = data.images
          setPreviewImg(data.images[imageSet.length - 1]?.src)
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
      <Row className="g-0">
        <Col
          xs={3}
          className={`rounded-start d-flex align-items-center justify-content-center bg-light border overflow-hidden`}
        >
          {previewImg ? (
            // <div
            //   className="h-100 w-100 rounded-start"
            //   style={{
            //     backgroundImage: `url(${previewImg})`,
            //     backgroundRepeat: 'no-repeat',
            //     backgroundPosition: 'center',
            //   }}
            // />
            <img
              src={previewImg}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Placeholder
              animation="glow"
              className="d-flex align-items-center justify-content-center"
            >
              <Placeholder
                style={{ height: '40px', width: '40px', borderRadius: '100%' }}
              />
            </Placeholder>
          )}
        </Col>
        <Col xs={9} className="border border-start-0">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{organization}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </ListItem>
  )
}
