import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { startCase } from "lodash"
import { useAuth } from "../contexts/auth/AuthContext"
import icon from "../images/icon.svg"
import { useEffect, useState } from "react"
import { useAddToHomescreenPrompt } from "../hooks/useAddToHomescreenPrompt"

export default function Menu() {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()
  const [installable, setInstallable] = useState(false)
  const [prompt, promptToInstall] = useAddToHomescreenPrompt()

  useEffect(() => {
    if (prompt) {
      setInstallable(true)
    }
  }, [prompt])

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
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
            {["about", "contact-us", "ethical-principles", "faq"].map((i) => (
              <Nav.Link key={`menu-link-${i}`} as={Link} to={i}>
                {startCase(i)}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            {installable && (
              <Button variant="primary" onClick={promptToInstall}>
                Install
              </Button>
            )}
            {user && (
              <NavDropdown
                title={
                  <>
                    <i className="bi bi-person-circle me-2" />
                  </>
                }
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="account">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    handleLogout()
                    navigate("")
                  }}
                >
                  Sign out <strong>{user.email}</strong>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
