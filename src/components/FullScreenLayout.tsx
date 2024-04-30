import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

/**
 * Full-screen layout for simple pages outside of the normal APP ui.
 */
export default function FullScreenLayout({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Container className="p-3 d-flex d-column justify-content-center align-items-center">
        <Card>
          <Card.Body>
            {title && <Card.Title>{title}</Card.Title>}
            {children}
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
