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

  return (
    <PopUp {...popUpProps}>
      {user && (
        <>
          <p
            dangerouslySetInnerHTML={{
              __html: t('confirmationModal.body', {
                email: user.email,
              }),
            }}
          />

          {resentCodeAt ? (
            <p>
              <i className="bi bi-check-circle me-1 align-middle text-success" />
              {t('confirmationModal.confirmationSent')}
            </p>
          ) : (
            <p>
              <a
                role="button"
                className="link"
                onClick={requestConfirmationCode}
              >
                {t('confirmationModal.resendLink')}
              </a>
            </p>
          )}
          <div className="text-center mt-5">
            <Link to="/terms-of-service">{t('tos.title')}</Link>
          </div>
        </>
      )}
    </PopUp>
  )
}
