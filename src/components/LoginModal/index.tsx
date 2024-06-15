import { Button, ModalProps } from 'react-bootstrap'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { ApiPasswordResets, ApiSession, ApiUsers } from 'src/api'
import toast from 'react-hot-toast'
import logo from 'src/images/icon.svg'
import ForgotPasswordForm, {
  IForgotPasswordFormState,
} from './ForgotPasswordForm'
import PopUp from '../PopUp'
import { LOGIN_PAGES } from './constants'
import LoginForm, { ILoginFormState } from './LoginForm'
import SignupForm, { ISignupFormState } from './SignupForm'
import ConfirmSignup from './ConfirmSignup'
import { useNavigate } from 'react-router-dom'
import { useTranslate } from '@tolgee/react'
import LinkedTextInToast from './LinkedTextInToast'

interface LoginModal extends ModalProps {
  page: number
  setPage: (p: number) => void
  postLogin: () => void
}

export default function LoginModal({
  page,
  setPage,
  postLogin,
  ...props
}: LoginModal) {
  const { user, setUser } = useAuth()
  const { t } = useTranslate(['login', 'shared'])
  const navigate = useNavigate()

  const logIn = async ({ email, password }: ILoginFormState) => {
    const { user, error } = await ApiSession.create(email, password)
    if (user) {
      setUser(user)
      toast.success(t('success'))
      postLogin()
    } else {
      if (error == 'Unauthorized') {
        toast(() => (
          <LinkedTextInToast
            regularText={t('loginFieldsError')}
            linkedText={t('resetPasswordHelper')}
            setPage={() => setPage(LOGIN_PAGES.FORGOT_PASSWORD)}
          />
        ))
      } else {
        toast.error(t('genericError', { ns: 'shared' }))
      }
    }
  }

  const signUp = async (data: ISignupFormState) => {
    const { user, error } = await ApiUsers.create(data)
    if (user) {
      setUser(user)
    } else {
      if (error == 'Email has already been taken') {
        toast(() => (
          <LinkedTextInToast
            regularText={t('emailTakenError')}
            linkedText={t('loginFromError')}
            setPage={() => setPage(LOGIN_PAGES.SIGN_IN)}
          />
        ))
      } else {
        toast.error(t('genericError', { ns: 'shared' }))
      }
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
      toast.error(t('genericError'))
    }

    props.onHide && props.onHide()
  }

  const PAGE_TITLES = [
    {
      title: t('loginTitle'),
    },
    {
      title: t('signupTitle'),
    },
    {
      title: t('forgotPasswordTitle'),
    },
    {
      title: t('confirmSignupTitle'),
    },
  ]

  const titleProps = PAGE_TITLES[page]

  return (
    <PopUp {...props} closeButton style={props.show ? {} : { zIndex: 0 }}>
      <div
        style={{ maxWidth: '300px', margin: '0 auto', minHeight: '500px' }}
        className="d-flex flex-column justify-content-center"
      >
        <div className="d-flex flex-column align-items-center justify-content-center">
          {page == LOGIN_PAGES.SIGN_IN ||
          page == LOGIN_PAGES.FORGOT_PASSWORD ? (
            <h5>
              <span className="d-flex align-items-start">
                <img src={logo} width="20" className="me-2" />
                {titleProps.title}
              </span>
            </h5>
          ) : (
            <>
              <img src={logo} width="50" className="mb-4" />
              <h3 className="text-center">{titleProps.title}</h3>
            </>
          )}
        </div>
        {page === LOGIN_PAGES.SIGN_IN && (
          <LoginForm
            isActive={page === LOGIN_PAGES.SIGN_IN}
            title={t('login')}
            submitLabel={t('login')}
            onSubmit={logIn}
            setPage={setPage}
          />
        )}
        {page === LOGIN_PAGES.SIGN_UP && (
          <SignupForm
            isActive={page === LOGIN_PAGES.SIGN_UP}
            title={t('signup')}
            submitLabel={t('signupLabel')}
            onSubmit={signUp}
            setPage={setPage}
          />
        )}
        {page === LOGIN_PAGES.FORGOT_PASSWORD && (
          <ForgotPasswordForm onSubmit={passwordReset} setPage={setPage} />
        )}
        {page === LOGIN_PAGES.CONFIRM_SIGNUP && user && (
          <ConfirmSignup email={user.email} />
        )}
      </div>
      <div className="mt-5 text-center">
        <a
          role="button"
          onClick={() => {
            navigate('/terms-of-service')
            if (props.onHide) props.onHide()
          }}
          className="link"
        >
          {t('readTermsOfService')}
        </a>
      </div>
    </PopUp>
  )
}
