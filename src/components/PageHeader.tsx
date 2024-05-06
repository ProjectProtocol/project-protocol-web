import { Col, Row } from 'react-bootstrap'
import { LOGIN_PAGES } from './LoginModal/constants'
import { useLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

interface IPageHeader {
  title: string
  showAccount?: boolean
  showBack?: boolean
  leftAction?: JSX.Element
}

export default function PageHeader({ title, showBack = false }: IPageHeader) {
  const { user } = useAuth()
  const { t } = useTranslation()
  const { openLogin } = useLogin()
  const navigate = useNavigate()

  return (
    <div className="py-2">
      {/* MOBILE PAGE HEADER */}
      <Row className="d-md-none">
        <Col>
          {showBack && (
            <div className="d-flex flex-row h-100 justify-content-start align-items-center">
              <a role="button" onClick={() => navigate(-1)}>
                <i className="bi bi-chevron-left align-middle" />
                {t('ui.back')}
              </a>
            </div>
          )}
        </Col>
        <Col xs="auto" style={{ maxWidth: '60%' }}>
          <div className="d-flex flex-row h-100 justify-content-end align-items-center">
            <h2
              className="text-center fw-semibold p-0 m-0"
              style={{ fontSize: 'min(5vw, 1.5rem)' }}
            >
              {title}
            </h2>
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-row h-100 justify-content-end align-items-center">
            {user ? (
              <Link
                to="/account"
                title={user ? 'Account' : 'Sign up or sign in'}
              >
                <i className="bi bi-person-circle align-middle fs-3" />
              </Link>
            ) : (
              <a
                className="link-primary text-decoration-none"
                onClick={() => openLogin(LOGIN_PAGES.SIGN_UP)}
              >
                {t('navigation.signUp')}
              </a>
            )}
          </div>
        </Col>
      </Row>

      {/* DESKTOP PAGE HEADER */}
      <div className="d-none d-md-block vertical-rhythm">
        {showBack && (
          <div>
            <a role="button" onClick={() => navigate(-1)}>
              <i className="bi bi-chevron-left align-middle" />
              {t('ui.back')}
            </a>
          </div>
        )}
        <h2 className="fw-semibold p-0 m-0">{title}</h2>
      </div>
    </div>
  )
}
