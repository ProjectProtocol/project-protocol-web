import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'

export default function ResourceImagePlacholder() {
  return (
    <Placeholder
      as={Card.Header}
      animation="glow"
      className="p-0 m-0 position-relative border-0"
    >
      <Placeholder
        width="100%"
        className="d-flex justify-content-center align-items-center"
        style={{ height: '180px' }}
        xs={12}
      />
    </Placeholder>
  )
}
