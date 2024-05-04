import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { NavigateFunction } from 'react-router-dom'
import { OpenLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'
import { LOGIN_PAGES } from './LoginModal/constants'
import User from 'src/types/User'
import { useTranslate } from '@tolgee/react'

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
  const { t } = useTranslate(['agent', 'rate_my_po'])

  const callback = () => navigate('/agents/new')

  return (
    <Card border="0" className="text-center mb-3">
      <Card.Body className="p-4">
        <h3 className="mb-4">{t('noResults', { ns: 'rate_my_po' })}</h3>
        {user ? (
          <Button
            onClick={() => (user.isConfirmed ? callback() : showConfirmModal())}
            aria-label={t('addAgent')}
            className="w-75 btn btn-lg btn-primary"
          >
            {t('addAgent')}
          </Button>
        ) : (
          <div className="text-center w-100 d-flex flex-column justify-content-center align-items-center">
            <Button
              onClick={() => openLogin(LOGIN_PAGES.SIGN_UP, { callback })}
              aria-label={t('signUpToAddAgent')}
              className="w-75 btn btn-lg btn-primary d-block"
            >
              {t('signUpToAddAgent')}
            </Button>
            <Button
              variant="link"
              onClick={() => openLogin(LOGIN_PAGES.SIGN_IN, { callback })}
            >
              {t('orLogIn')}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
