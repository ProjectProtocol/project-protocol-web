import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import icon from "../../images/icon.svg"
import { useAuth } from "../../contexts/auth/AuthContext"
import MobileMenu from "./MobileMenu"

export default function Menu() {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()

  return (
    <Navbar className="bg-white" sticky="top">
      <Container style={{ maxWidth: 935 }}>
        <Navbar.Brand onClick={() => navigate("")}>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <img src={icon} width="30" height="30" className="me-1" alt="Project Protocol Logo" />
            <span className="text-info fs-2 w-100 d-none d-md-inline" style={{ letterSpacing: -0.5 }}>ProjectProtocol</span>
          </div>
        </Navbar.Brand>
        <span className="text-info fs-2 w-100 text-center d-md-none" style={{ letterSpacing: -0.5 }}>ProjectProtocol</span>
        <Nav className="fs-3 d-none d-md-flex" style={{ fontWeight: 600 }}>
          <Nav.Link as={NavLink} to="">
            Search officers
          </Nav.Link>
          <Nav.Link as={NavLink} to="resources">
            Resources
          </Nav.Link>
          {user && (
            <>
              <Nav.Link as={NavLink} to="account">
                Account
              </Nav.Link>
              <Nav.Link
                role="button"
                onClick={() => {
                  handleLogout()
                  navigate("")
                }}
              >
                Sign out
              </Nav.Link>
            </>
          )}
        </Nav>
        <MobileMenu
          user={user}
          logout={() => {
            handleLogout()
            navigate("")
          }}
        />
      </Container>
    </Navbar>
  )
}
