import { uniqueId } from 'lodash'
import { useTranslation } from 'react-i18next'
import { LOGIN_PAGES } from './constants'

type LinkName = 'SIGN_UP' | 'SIGN_IN' | 'FORGOT_PASSWORD'

interface ILoginModalLinks {
  setPage: (n: number) => void
  pages: LinkName[]
}
export default function LoginModalLinks({ setPage, pages }: ILoginModalLinks) {
  const { t } = useTranslation()

  const links = {
    SIGN_UP: {
      onClick: () => setPage(LOGIN_PAGES.SIGN_UP),
      label: t('account.signUp'),
      id: uniqueId(),
    },
    SIGN_IN: {
      onClick: () => setPage(LOGIN_PAGES.SIGN_IN),
      label: t('account.login.login'),
      id: uniqueId(),
    },
    FORGOT_PASSWORD: {
      onClick: () => setPage(LOGIN_PAGES.FORGOT_PASSWORD),
      label: t('account.forgotPassword'),
      id: uniqueId(),
    },
  }

  return (
    <div className="d-flex flex-row justify-content-between pt-3">
      {pages.map((p) => (
        <a
          key={links[p].id}
          className="link link-primary"
          role="button"
          onClick={links[p].onClick}
        >
          {links[p].label}
        </a>
      ))}
    </div>
  )
}
