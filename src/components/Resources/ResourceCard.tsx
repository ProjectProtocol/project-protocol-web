import { ChainModifiers, Entry } from 'contentful'
import ListItem from '../List/ListItem'
import { Card, Col, Row } from 'react-bootstrap'
import { ResourceLinkSkeleton } from 'src/types/contentful-types'

const variants = [
  'bi-info-circle text-secondary',
  'bi-info-circle-fill text-secondary',
  'bi-people text-primary',
]

export default function ResourceCard({
  resource,
  index,
}: {
  resource: Entry<ResourceLinkSkeleton, ChainModifiers, string>
  index: number
}) {
  const icon = variants[index % 3]

  return (
    <ListItem
      onClick={() => window.open(resource.fields.url as string, '_blank')}
    >
      <Row className="g-0">
        <Col
          xs={2}
          className={`rounded-start p-3 d-flex align-items-center justify-content-center bg-light-subtle border`}
        >
          <i className={`bi ${icon} fs-1`} />
        </Col>
        <Col xs={10} className="border border-start-0">
          <Card.Body>
            <Card.Title>{resource.fields.title as string}</Card.Title>
            <Card.Text>{resource.fields.organization as string}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </ListItem>
  )
}
