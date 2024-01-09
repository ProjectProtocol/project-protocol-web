import { Button } from 'react-bootstrap'
import User from 'src/types/User'
import { LOGIN_PAGES } from '../LoginModal/constants'
import { useTranslation } from 'react-i18next'

export interface IRateAgentButton {
  user?: User
  isRateable: boolean
  openLogin: (n: number) => void
  showRatingModal: () => void
  showConfirmationModal: () => void
}
export default function RateAgentButton({
  user,
  isRateable,
  openLogin,
  showRatingModal,
  showConfirmationModal,
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

  const hasRecentReviews = user && !isRateable

  return (
    <div style={{ maxWidth: '150px' }}>
      <Button
        className="w-100"
        onClick={rateButtonOnClick}
        disabled={hasRecentReviews}
      >
        {user ? t('agent.rateAgent') : t('agent.signUp')}
      </Button>
      {hasRecentReviews && (
        <p className="my-1 text-dark small text-center">
          {t('agent.unrateable')}
        </p>
      )}
      {!user && (
        <div className="text-center">
          <Button variant="link" onClick={() => openLogin(LOGIN_PAGES.SIGN_IN)}>
            {t('agent.logIn')}
          </Button>
        </div>
      )}
    </div>
  )
}
