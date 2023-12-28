import { useTranslation } from 'react-i18next'

interface IConfirmSignup {
  email: string
}

export default function ConfirmSignup({ email }: IConfirmSignup) {
  const { t } = useTranslation()

  return (
    <div className="d-block p-4">
      <div>
        <p className="mb-4">
          {t('account.loginModal.loginConfirmSignupDetail1', {
            email: <strong>{email}</strong>,
          })}
        </p>
        <p>{t('account.loginModal.loginConfirmSignupDetail2')}</p>
      </div>
    </div>
  )
}
