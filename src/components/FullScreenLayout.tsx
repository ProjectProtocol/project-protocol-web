import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import icon from '../images/icon.svg'

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
    <div className="bg-light min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <Container style={{ maxWidth: 600 }}>
        <Card>
          <Card.Body className="vertical-rhythm">
            <h5>
              <span className="d-flex align-items-start">
                <img src={icon} width="20" className="me-2" />
                {title}
              </span>
            </h5>
            {children}
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
