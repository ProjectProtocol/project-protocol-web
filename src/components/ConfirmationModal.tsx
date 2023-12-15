import User from 'src/types/User'
import PopUp, { IPopUp } from './PopUp'
import { useState } from 'react'
import { ApiConfirmations } from 'src/api'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface IConfirmationModal extends IPopUp {
  user?: User
  resentCodeAt?: Date
}

export default function ConfirmationModal({
  user,
  ...popUpProps
}: IConfirmationModal) {
  const [resentCodeAt, setResentCodeAt] = useState<Date>()
  const { t } = useTranslation()
  const requestConfirmationCode = async () => {
    const success = await ApiConfirmations.resend()
    if (success) {
      setResentCodeAt(new Date())
    } else {
      toast.error(t('error.generic'))
    }
  }
  // TODO: Translation strings
  return (
    <PopUp {...popUpProps}>
      {user && (
        <>
          <p>
            We previously sent an email to <strong>{user.email}</strong> to
            confirm this email belongs to you. Tap on the button in the email to
            finish signing up.
          </p>

          {resentCodeAt ? (
            <p>
              <i className="bi bi-check-circle me-1 align-middle text-success" />
              Confirmation email sent
            </p>
          ) : (
            <p>
              If you did not receive an email,{' '}
              <a
                role="button"
                className="link"
                onClick={requestConfirmationCode}
              >
                click here to resend
              </a>
              .
            </p>
          )}
          <div className="text-center mt-5">
            <Link to="/terms-of-service">Terms of use</Link>
          </div>
        </>
      )}
    </PopUp>
  )
}
