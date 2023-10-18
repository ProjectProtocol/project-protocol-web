import { ResourceLink } from 'src/types/ResourceLink'
import ListItem from './List/ListItem'
import { Col, Row } from 'react-bootstrap'

export default function ResourceCard({ resource }: { resource: ResourceLink }) {
  const { url, title, organization } = resource.fields

  return (
    <ListItem onClick={() => window.open(url, '_blank')}>
      <Row>
        <Col xs={10}>
          <h3>{title}</h3>
          <p>{organization}</p>
        </Col>
        <Col>hi</Col>
      </Row>
    </ListItem>
  )
}
