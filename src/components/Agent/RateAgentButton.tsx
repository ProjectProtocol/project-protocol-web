import { Button } from 'react-bootstrap'
import User from 'src/types/User'
import { LOGIN_PAGES } from '../LoginModal/constants'
import { useTranslation } from 'react-i18next'
import { OpenLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'
import AsyncButton from '../AsyncButton'
import toast from 'react-hot-toast'

export interface IRateAgentButton {
  user?: User
  isRateable: boolean
  openLogin: OpenLogin
  isLoading: boolean
  revalidate: () => void
  showRatingModal: () => void
  showConfirmationModal: () => void
}
export default function RateAgentButton({
  user,
  isLoading,
  isRateable,
  openLogin,
  revalidate,
  showRatingModal,
  showConfirmationModal,
}: IRateAgentButton) {
  const { t } = useTranslation()

  const hasRecentReviews = user && !isRateable

  const rateButtonOnClick = () => {
    if (user) {
      if (user.isConfirmed && hasRecentReviews) {
        return toast(t('agent.unrateable'), {
          icon: 'ℹ️',
          id: `agent-unrateable-toast`,
          duration: 3000,
        })
      }

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
    <div>
      <AsyncButton
        className="w-100"
        onClick={rateButtonOnClick}
        loading={isLoading}
      >
        {user ? t('agent.rateAgent') : t('agent.signUp')}
      </AsyncButton>
      {!user && (
        <div className="text-center">
          <Button
            variant="link"
            onClick={() =>
              openLogin(LOGIN_PAGES.SIGN_IN, {
                callback: revalidate,
              })
            }
          >
            {t('agent.logIn')}
          </Button>
        </div>
      )}
    </div>
  )
}
