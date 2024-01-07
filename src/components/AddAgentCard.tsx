import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { NavigateFunction } from 'react-router-dom'
import { OpenLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'
import { LOGIN_PAGES } from './LoginModal/constants'
import User from 'src/types/User'

interface IAddAgentCard {
  openLogin: OpenLogin
  user?: User
  navigate: NavigateFunction
  showConfirmModal: () => void
}

export default function AddAgentCard({
  openLogin,
  user,
  navigate,
  showConfirmModal,
}: IAddAgentCard) {
  const { t } = useTranslation()

  return (
    <Card border="0" className="text-center mb-3">
      <Card.Body className="p-4">
        <h3 className="mb-4">{t('search.noResults')}</h3>
        {user ? (
          <Button
            onClick={() =>
              user.isConfirmed ? navigate('/agents/new') : showConfirmModal()
            }
            aria-label={t('search.addAnAgent')}
            className="w-75 btn btn-lg btn-primary"
          >
            {t('search.addAnAgent')}
          </Button>
        ) : (
          <div className="text-center w-100 d-flex flex-column justify-content-center align-items-center">
            <Button
              onClick={() => openLogin(LOGIN_PAGES.SIGN_UP)}
              aria-label={t('search.signUpToAddAgent')}
              className="w-75 btn btn-lg btn-primary d-block"
            >
              {t('search.signUpToAddAgent')}
            </Button>
            <Button
              variant="link"
              onClick={() => openLogin(LOGIN_PAGES.SIGN_IN)}
            >
              {t('search.orLogIn')}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
