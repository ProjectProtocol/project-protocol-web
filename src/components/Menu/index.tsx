import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import icon from '../../images/icon.svg'
import User from 'src/types/User'
import { useLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'
import LocaleSwitcher from 'src/components/LocaleSwitcher'
import { LOGIN_PAGES } from '../LoginModal/constants'

const MENU_MAX_WIDTH = 935

interface IMenu {
  user?: User
}

export default function Menu({ user }: IMenu) {
  const { t } = useTranslation()
  const { openLogin } = useLogin()
  const navigate = useNavigate()

  return (
    <Navbar
      variant="dark"
      className="bg-black flex-column py-0 overflow-hidden"
      sticky="top"
    >
      {/* Desktop locale switcher */}
      <div
        className="w-100 d-none d-md-block bg-white"
        // style={{ background: 'rgba(255,255,255,0.15)' }}
      >
        <Container style={{ maxWidth: MENU_MAX_WIDTH }}>
          <div className="d-flex flex-row justify-content-end align-items-center py-2">
            <LocaleSwitcher />
          </div>
        </Container>
      </div>

      <div className="w-100 d-block bg-black">
        <Container
          style={{ maxWidth: MENU_MAX_WIDTH }}
          className="py-2 py-md-3 d-flex justify-content-between align-items-center"
        >
          <Navbar.Brand onClick={() => navigate('')}>
            <div
              className="d-flex flex-row justify-content-center align-items-center"
              role="button"
            >
              <img
                src={icon}
                width="28"
                height="28"
                className="me-2"
                alt={t('ui.ppLogoAlt')}
              />
              <span
                className="fs-2 w-100 d-md-inline fw-medium pe-auto text-white"
                style={{ letterSpacing: -0.5 }}
              >
                Project Protocol
              </span>
            </div>
          </Navbar.Brand>
          <Nav className="fs-4 d-none d-md-flex align-items-center text-white gap-2">
            <Nav.Link as={NavLink} className=" m-0" to="/">
              {t('home.title')}
            </Nav.Link>
            <Nav.Link as={NavLink} className=" m-0" to="/rate-my-po">
              {t('navigation.searchOfficers')}
            </Nav.Link>
            <Nav.Link as={NavLink} className="  m-0" to="resources">
              {t('navigation.resources')}
            </Nav.Link>
            {user ? (
              <Nav.Link
                as={NavLink}
                className="m-0"
                to="/account"
                title={t('navigation.account')}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <i
                    className="bi bi-person-circle align-middle fs"
                    style={{ fontSize: '1.4rem' }}
                  />
                </div>
              </Nav.Link>
            ) : (
              <Nav.Link>
                <Button
                  onClick={() => {
                    openLogin(LOGIN_PAGES.SIGN_UP)
                  }}
                >
                  {t('navigation.signUp')}
                </Button>
              </Nav.Link>
            )}
          </Nav>
          <Nav className="d-md-none">
            <LocaleSwitcher dark />
          </Nav>
        </Container>
      </div>
    </Navbar>
  )
}
