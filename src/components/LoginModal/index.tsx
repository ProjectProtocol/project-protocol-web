import { Button, Carousel, ModalProps } from 'react-bootstrap'
import UserForm, { IUserFormState } from './UserForm'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { ApiPasswordResets, ApiSession, ApiUsers } from 'src/api'
import toast from 'react-hot-toast'

import ForgotPasswordForm, {
  IForgotPasswordFormState,
} from './ForgotPasswordForm'
import LoginModalLinks from './LoginModalLinks'
import PopUp from '../PopUp'
import { PAGE_TITLES, LOGIN_PAGES } from './constants'

interface LoginModal extends ModalProps {
  page: number
  setPage: (p: number) => void
}

export default function LoginModal({ page, setPage, ...props }: LoginModal) {
  const { setUser } = useAuth()

  const logIn = async ({ email, password }: IUserFormState) => {
    const { user } = await ApiSession.create(email, password)
    if (user) {
      setUser(user)
      toast.success('Sign in successful!')
    } else {
      toast.error('Something went wrong, please try again')
    }
  }

  const signUp = async (data: IUserFormState) => {
    const { user } = await ApiUsers.create(data)
    if (user) {
      setUser(user)
      toast.success('Account creation successful')
    } else {
      toast.error('Something went wrong, please try again')
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
      toast.error('Something went wrong, please try again')
    }

    props.onHide && props.onHide()
  }
  const titleProps = PAGE_TITLES[page]

  return (
    <PopUp
      {...props}
      {...titleProps}
      contentClassName="p-3"
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
          <div className="p-3">
            <UserForm
              isActive={page === LOGIN_PAGES.SIGN_IN}
              title="Log in"
              submitLabel="Log in"
              onSubmit={logIn}
            />
            <LoginModalLinks
              pages={['SIGN_UP', 'FORGOT_PASSWORD']}
              setPage={setPage}
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="p-3">
            <UserForm
              isActive={page === LOGIN_PAGES.SIGN_UP}
              title="Sign up"
              submitLabel="Continue"
              onSubmit={signUp}
            />
            <LoginModalLinks
              pages={['SIGN_IN', 'FORGOT_PASSWORD']}
              setPage={setPage}
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="p-3">
            <ForgotPasswordForm onSubmit={passwordReset} />
            <LoginModalLinks pages={['SIGN_IN', 'SIGN_UP']} setPage={setPage} />
          </div>
        </Carousel.Item>
      </Carousel>
    </PopUp>
  )
}
