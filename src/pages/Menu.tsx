import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth/AuthContext'
import icon from '../images/icon.svg'

export default function Menu() {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container style={{ maxWidth: 800 }}>
        <Navbar.Brand onClick={() => navigate('')}>
          <img src={icon} width="25" height="25" className="me-1" />
          <span style={{ letterSpacing: -0.5 }}>ProjectProtocol</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="about">
              About
            </Nav.Link>
            {user && (
              <>
                <Nav.Link as={Link} to="account">
                  Settings
                </Nav.Link>
                <Nav.Link
                  role="button"
                  onClick={() => {
                    handleLogout()
                    navigate('')
                  }}
                >
                  Sign out <strong>({user.email})</strong>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
