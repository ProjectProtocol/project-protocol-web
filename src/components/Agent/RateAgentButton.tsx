import { Button } from 'react-bootstrap'
import User from 'src/types/User'
import { LOGIN_PAGES } from '../LoginModal/constants'

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
  // TODO: Translation strings
  return (
    <>
      <Button className="w-100" onClick={rateButtonOnClick}>
        {user ? 'Rate agent' : 'Sign up to rate'}
      </Button>
      {!user && (
        <div className="text-center">
          <Button variant="link" onClick={() => openLogin(LOGIN_PAGES.SIGN_IN)}>
            or log in
          </Button>
        </div>
      )}
    </>
  )
}
