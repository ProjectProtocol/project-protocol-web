import { Button, Carousel, ModalProps } from 'react-bootstrap'
import UserForm, { IUserFormState } from './UserForm'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { ApiPasswordResets, ApiSession, ApiUsers } from 'src/api'
import toast from 'react-hot-toast'

import ForgotPasswordForm, {
  IForgotPasswordFormState,
} from './ForgotPasswordForm'
import { useTranslation } from 'react-i18next'
import LoginModalLinks from './LoginModalLinks'
import PopUp from '../PopUp'
import { PAGE_TITLES, LOGIN_PAGES } from './constants'

interface LoginModal extends ModalProps {
  page: number
  setPage: (p: number) => void
}

export default function LoginModal({ page, setPage, ...props }: LoginModal) {
  const { setUser } = useAuth()
  const { t } = useTranslation()

  const logIn = async ({ email, password }: IUserFormState) => {
    const { user } = await ApiSession.create(email, password)
    if (user) {
      setUser(user)
      toast.success(t('account.login.success'))
    } else {
      toast.error(t('error.generic'))
    }
  }

  const signUp = async (data: IUserFormState) => {
    const { user } = await ApiUsers.create(data)
    if (user) {
      setUser(user)
      toast.success(t('account.create.success'))
    } else {
      toast.error(t('error.generic'))
    }
  }

  const passwordReset = async ({ email }: IForgotPasswordFormState) => {
    const result = await ApiPasswordResets.create({ email })
    if (result) {
      toast.success(
        (t) => (
          <span>
            {result?.message}
            <Button
              size="sm"
              variant="link"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </Button>
          </span>
        ),
        {
          duration: Infinity,
        },
      )
    } else {
      toast.error(t('error.generic'))
    }

    props.onHide && props.onHide()
  }
  const titleProps = PAGE_TITLES[page]

  return (
    <PopUp
      {...props}
      {...titleProps}
      closeButton
      style={props.show ? {} : { zIndex: 0 }}
    >
      <Carousel
        activeIndex={page}
        controls={false}
        indicators={false}
        slide={false}
      >
        <Carousel.Item>
          <UserForm
            isActive={page === LOGIN_PAGES.SIGN_IN}
            title={t('account.login.login')}
            submitLabel={t('account.login.loginLabel')}
            onSubmit={logIn}
          />
          <LoginModalLinks
            pages={['SIGN_UP', 'FORGOT_PASSWORD']}
            setPage={setPage}
          />
        </Carousel.Item>
        <Carousel.Item>
          <UserForm
            isActive={page === LOGIN_PAGES.SIGN_UP}
            title={t('account.login.signup')}
            submitLabel={t('account.login.signupLabel')}
            onSubmit={signUp}
          />
          <LoginModalLinks
            pages={['SIGN_IN', 'FORGOT_PASSWORD']}
            setPage={setPage}
          />
        </Carousel.Item>
        <Carousel.Item>
          <ForgotPasswordForm onSubmit={passwordReset} />
          <LoginModalLinks pages={['SIGN_IN', 'SIGN_UP']} setPage={setPage} />
        </Carousel.Item>
      </Carousel>
    </PopUp>
  )
}
