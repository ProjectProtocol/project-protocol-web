import { Button, Carousel, ModalProps } from 'react-bootstrap'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { ApiPasswordResets, ApiSession, ApiUsers } from 'src/api'
import toast from 'react-hot-toast'

import ForgotPasswordForm, {
  IForgotPasswordFormState,
} from './ForgotPasswordForm'
import { useTranslation } from 'react-i18next'
import PopUp from '../PopUp'
import { PAGE_TITLES, LOGIN_PAGES } from './constants'
import LoginForm, { ILoginFormState } from './LoginForm'
import SignupForm, { ISignupFormState } from './SignupForm'

interface LoginModal extends ModalProps {
  page: number
  setPage: (p: number) => void
}

export default function LoginModal({ page, setPage, ...props }: LoginModal) {
  const { setUser } = useAuth()
  const { t } = useTranslation()

  const logIn = async ({ email, password }: ILoginFormState) => {
    const { user } = await ApiSession.create(email, password)
    if (user) {
      setUser(user)
      toast.success(t('account.login.success'))
    } else {
      toast.error(t('error.generic'))
    }
  }

  const signUp = async (data: ISignupFormState) => {
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
          <LoginForm
            isActive={page === LOGIN_PAGES.SIGN_IN}
            title={t('account.login.login')}
            submitLabel={t('account.login.loginLabel')}
            onSubmit={logIn}
            setPage={setPage}
          />
        </Carousel.Item>
        <Carousel.Item>
          <SignupForm
            isActive={page === LOGIN_PAGES.SIGN_UP}
            title={t('account.login.signup')}
            submitLabel={t('account.login.signupLabel')}
            onSubmit={signUp}
            setPage={setPage}
          />
        </Carousel.Item>
        <Carousel.Item>
          <ForgotPasswordForm onSubmit={passwordReset} setPage={setPage} />
        </Carousel.Item>
      </Carousel>
    </PopUp>
  )
}
