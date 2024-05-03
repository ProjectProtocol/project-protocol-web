import { T, useTranslate } from '@tolgee/react'

interface IConfirmSignup {
  email: string
}

export default function ConfirmSignup({ email }: IConfirmSignup) {
  const { t } = useTranslate('login')

  return (
    <div className="d-block p-4">
      <div>
        <p className="mb-4">
          <T
            keyName={'loginConfirmSignupDetail1'}
            ns="login"
            params={{ email, b: (chunks: React.ReactNode) => <b>{chunks}</b> }}
          />
        </p>
        <p>{t('loginConfirmSignupDetail2')}</p>
      </div>
    </div>
  )
}
