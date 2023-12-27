import { Button } from 'react-bootstrap'
import User from 'src/types/User'
import { LOGIN_PAGES } from '../LoginModal/constants'
import { useTranslation } from 'react-i18next'

interface IRateAgentButton {
  user?: User
  showRatingModal: () => void
  showConfirmationModal: () => void
  openLogin: (n: number) => void
}
export default function RateAgentButton({
  user,
  showRatingModal,
  showConfirmationModal,
  openLogin,
}: IRateAgentButton) {
  const { t } = useTranslation()

  const rateButtonOnClick = () => {
    if (user) {
      if (user.isConfirmed) {
        showRatingModal()
      } else {
        showConfirmationModal()
      }
    } else {
      openLogin(LOGIN_PAGES.SIGN_UP)
    }
  }

  return (
    <>
      <Button className="w-100" onClick={rateButtonOnClick}>
        {user ? t('agent.rateAgent') : t('agent.signUp')}
      </Button>
      {!user && (
        <div className="text-center">
          <Button variant="link" onClick={() => openLogin(LOGIN_PAGES.SIGN_IN)}>
            {t('agent.logIn')}
          </Button>
        </div>
      )}
    </>
  )
}
