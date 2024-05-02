import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import icon from '../images/icon.svg'
import LocaleSwitcher from './LocaleSwitcher'

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
            <div className="text-end">
              <LocaleSwitcher />
            </div>
            <div className="text-center vertical-rhythm">
              <img src={icon} width="50" />
              <h2>{title}</h2>
            </div>
            {children}
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
