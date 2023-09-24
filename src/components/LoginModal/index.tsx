import { Carousel, Modal, ModalBody, ModalProps } from 'react-bootstrap'
import UserForm, { IUserFormState } from './UserForm'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { ApiSession, ApiUsers } from 'src/api'
import toast from 'react-hot-toast'
import { LOGIN_PAGES } from './constants'

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

  return (
    <Modal {...props} centered size="sm">
      <div className="modal-header border-0">
        <div className="w-100 text-end">
          <a className="link-dark" role="button" onClick={props.onHide}>
            <i className="bi bi-x fs-3" />
          </a>
        </div>
      </div>
      <ModalBody>
        <Carousel activeIndex={page} controls={false} indicators={false}>
          <Carousel.Item>
            <div className="p-3">
              <UserForm title="Log in" submitLabel="Log in" onSubmit={logIn} />
              <div className="small">
                New to Project Protocol?{' '}
                <a
                  className="link link-primary"
                  role="button"
                  onClick={() => setPage(LOGIN_PAGES.SIGN_UP)}
                >
                  Sign up
                </a>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="p-3">
              <UserForm
                title="Sign up"
                submitLabel="Continue"
                onSubmit={signUp}
              />
              <div className="small">
                Already have an account?{' '}
                <a
                  className="link link-primary"
                  role="button"
                  onClick={() => setPage(LOGIN_PAGES.SIGN_IN)}
                >
                  Sign in
                </a>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </ModalBody>
    </Modal>
  )
}
