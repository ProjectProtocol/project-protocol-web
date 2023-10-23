import { Card, Placeholder } from 'react-bootstrap'
import ResourceImagePlacholder from './ResourceImagePlaceholder'

export default function ResourcePlaceholder() {
  return (
    <Card>
      <ResourceImagePlacholder />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={3} /> <Placeholder x={8} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
          <Placeholder xs={5} />
        </Placeholder>
      </Card.Body>
    </Card>
  )
}
