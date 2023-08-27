import { Container, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import icon from "../../images/icon.svg"
import { useAuth } from "../../contexts/auth/AuthContext"
import MobileMenu from "./MobileMenu"

export default function Menu() {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container style={{ maxWidth: 800 }}>
        <Navbar.Brand onClick={() => navigate("")}>
          <img src={icon} width="25" height="25" className="me-1" />
          <span style={{ letterSpacing: -0.5 }}>ProjectProtocol</span>
        </Navbar.Brand>
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
