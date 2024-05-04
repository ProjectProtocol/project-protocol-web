import User from 'src/types/User'
import PopUp, { IPopUp } from './PopUp'
import { useState } from 'react'
import { ApiConfirmations } from 'src/api'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { T, useTranslate } from '@tolgee/react'

interface IConfirmationModal extends IPopUp {
  user?: User
  resentCodeAt?: Date
}

export default function ConfirmationModal({
  user,
  ...popUpProps
}: IConfirmationModal) {
  const [resentCodeAt, setResentCodeAt] = useState<Date>()
  const { t } = useTranslate(['home', 'navigation'])
  const requestConfirmationCode = async () => {
    const success = await ApiConfirmations.resend()
    if (success) {
      setResentCodeAt(new Date())
    } else {
      toast.error(t('genericError'))
    }
  }

  return (
    <PopUp {...popUpProps}>
      {user && (
        <>
          <p>
            <T
              keyName={'confirmationModal.body'}
              ns="home"
              params={{
                email: user.email,
                b: (chunks: React.ReactNode) => <b>{chunks}</b>,
              }}
            />
          </p>

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
            <Link to="/terms-of-service" className="link">
              {t('termsOfService', { ns: 'navigation' })}
            </Link>
          </div>
        </>
      )}
    </PopUp>
  )
}
