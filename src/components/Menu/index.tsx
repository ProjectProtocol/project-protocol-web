import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import icon from '../../images/icon.svg'
import MobileMenu from './MobileMenu'
import MenuLinks from './MenuLinks'
import User from 'src/types/User'
import useWindowSize from 'src/hooks/useWindowSize'
import { useEffect, useState } from 'react'

interface IMenu {
  user?: User
  openLogin: (page: number) => void
}

export default function Menu({ user, openLogin }: IMenu) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const size = useWindowSize()
  const location = useLocation()
  const [showDrawer, setShowDrawer] = useState(false)
  const openDrawer = () => setShowDrawer(true)
  const closeDrawer = () => setShowDrawer(false)

  useEffect(() => {
    if (location) {
      closeDrawer()
    }
  }, [location, size])

  return (
    <Navbar className="bg-white" sticky="top">
      <Container style={{ maxWidth: 935 }}>
        <Navbar.Brand onClick={() => navigate('')}>
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            role="button"
          >
            <img
              src={icon}
              width="30"
              height="30"
              className="me-1"
              alt={t('ui.ppLogoAlt')}
            />
            <span
              className="fs-2 w-100 d-none d-md-inline fw-medium pe-auto text-body"
              style={{ letterSpacing: -0.5 }}
            >
              Project Protocol
            </span>
          </div>
        </Navbar.Brand>
        <span
          className="fs-2 w-100 text-center d-md-none fw-medium"
          style={{ letterSpacing: -0.5 }}
        >
          Project Protocol
        </span>
        <Nav className="fs-4 d-none d-md-flex align-items-center">
          <MenuLinks isSignedIn={!!user} openLogin={openLogin} />
        </Nav>
        <div className="d-md-none">
          <Button variant="link" onClick={openDrawer}>
            <i className="bi bi-list text-body fs-2" />
          </Button>
          <MobileMenu onHide={closeDrawer} show={showDrawer}>
            <MenuLinks
              isSignedIn={!!user}
              openLogin={(page: number) => {
                closeDrawer()
                openLogin(page)
              }}
            />
          </MobileMenu>
        </div>
      </Container>
    </Navbar>
  )
}
