import { Card, Col, Placeholder, Row } from 'react-bootstrap'

export default function ResourcePlaceholder() {
  return (
    <Card>
      <Row className="g-0">
        <Col
          xs={2}
          className={`rounded-start p-3 d-flex align-items-center justify-content-center bg-light-subtle border`}
        >
          <Placeholder
            animation="glow"
            className="d-flex align-items-center justify-content-center"
          >
            <Placeholder
              style={{ height: '40px', width: '40px', borderRadius: '100%' }}
            />
          </Placeholder>
        </Col>
        <Col xs={10} className="border border-start-0">
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={3} /> <Placeholder x={8} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
              <Placeholder xs={4} /> <Placeholder xs={5} />
            </Placeholder>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}
