import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { startCase } from "lodash"
import { useAuth } from "../contexts/auth/AuthContext"
import icon from "../images/icon.svg"

export default function Menu() {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => navigate("")}>
          <img src={icon} width="25" height="25" className="me-1" />
          <span style={{ letterSpacing: -0.5 }}>ProjectProtocol</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="">
              Home
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="About" id="basic-nav-dropdown" align="end">
              {["about", "contact-us", "ethical-principles", "faq"].map((i) => (
                <NavDropdown.Item key={`menu-link-${i}`} as={Link} to={i}>
                  {startCase(i)}
                </NavDropdown.Item>
              ))}
              {user && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="account">
                    Account
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Sign out <strong>{user.email}</strong>
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
