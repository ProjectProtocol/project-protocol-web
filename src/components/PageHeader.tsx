import { Col, Row } from 'react-bootstrap'
import { LOGIN_PAGES } from './LoginModal/constants'
import { useLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

interface IPageHeader {
  title: string
  showAccount?: boolean
  showBack?: boolean
}

export default function PageHeader({ title, showBack = false }: IPageHeader) {
  const { user } = useAuth()
  const { t } = useTranslation()
  const { openLogin } = useLogin()
  const navigate = useNavigate()

  return (
    <div className="py-2">
      <Row className="d-md-none">
        <Col>
          {showBack && (
            <div className="h-100 d-flex align-items-center">
              <a role="button" onClick={() => navigate(-1)}>
                <i className="bi bi-chevron-left align-middle" />
                {t('ui.back')}
              </a>
            </div>
          )}
        </Col>
        <Col xs="auto">
          <h2 className="text-center fw-semibold p-0 m-0">{title}</h2>
        </Col>
        <Col>
          <div className="text-end">
            <a
              onClick={() =>
                user ? navigate('/account') : openLogin(LOGIN_PAGES.SIGN_UP)
              }
              title={user ? 'Account' : 'Sign up or sign in'}
            >
              <i className="bi bi-person-circle align-middle fs-3" />
            </a>
          </div>
        </Col>
      </Row>
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
