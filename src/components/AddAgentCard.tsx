import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { LOGIN_PAGES } from './LoginModal/constants'

export default function AddAgentCard() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { openLogin } = useLogin()

  return (
    <Card border="0" className="text-center mb-3">
      <Card.Body className="p-4">
        <h3 className="mb-4">{t('search.noResults')}</h3>
        {!!user ? (
          <Link
            to="/agents/new"
            aria-label={t('search.addAnAgent')}
            className="w-75 btn btn-lg btn-primary"
          >
            {t('search.addAnAgent')}
          </Link>
        ) : (
          <div className="text-center w-100 d-flex flex-column justify-content-center align-items-center">
            <Button
              onClick={() => openLogin(LOGIN_PAGES.SIGN_UP, '/agents/new')}
              aria-label={t('search.signUpToAddAgent')}
              className="w-75 btn btn-lg btn-primary d-block"
            >
              {t('search.signUpToAddAgent')}
            </Button>
            <Button
              variant="link"
              onClick={() => openLogin(LOGIN_PAGES.SIGN_IN, '/agents/new')}
            >
              {t('search.orLogIn')}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
