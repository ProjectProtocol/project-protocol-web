import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import icon from '../../images/icon.svg'
import MobileMenu from './MobileMenu'
import MenuLinks from './MenuLinks'
import User from 'src/types/User'

interface IMenu {
  user?: User
  logout: () => void
  openLogin: (page: number) => void
}
export default function Menu({ user, logout, openLogin }: IMenu) {
  const navigate = useNavigate()

  return (
    <Navbar className="bg-white" sticky="top">
      <Container style={{ maxWidth: 935 }}>
        <Navbar.Brand onClick={() => navigate('')}>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <img
              src={icon}
              width="30"
              height="30"
              className="me-1"
              alt="Project Protocol Logo"
            />
            <span
              className="text-brand fs-2 w-100 d-none d-md-inline fw-medium"
              style={{ letterSpacing: -0.5 }}
            >
              ProjectProtocol
            </span>
          </div>
        </Navbar.Brand>
        <span
          className="text-brand fs-2 w-100 text-center d-md-none fw-medium"
          style={{ letterSpacing: -0.5 }}
        >
          ProjectProtocol
        </span>
        <Nav className="fs-4 d-none d-md-flex">
          <MenuLinks
            logout={logout}
            isSignedIn={!!user}
            openLogin={openLogin}
          />
        </Nav>
        <MobileMenu user={user}>
          <MenuLinks
            logout={logout}
            isSignedIn={!!user}
            openLogin={openLogin}
          />
        </MobileMenu>
      </Container>
    </Navbar>
  )
}
