import { useEffect, useState } from 'react'
import { LOGIN_PAGES } from 'src/components/LoginModal/constants'
import { useAuth } from '../auth/AuthContext'
import LoginModal from 'src/components/LoginModal'
import { LoginUIContext } from './LoginUIContext'
import { useNavigate } from 'react-router-dom'

export default function LoginUIProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const [loginOpen, setLoginOpen] = useState(!!user)
  const [loginPage, setLoginPage] = useState(LOGIN_PAGES.SIGN_IN)
  const [redirectPath, setRedirectPath] = useState<string>('')
  const navigate = useNavigate()

  const closeLogin = () => setLoginOpen(false)

  const openLogin = (page: number, postLoginPath: string = '') => {
    setLoginPage(page)
    setLoginOpen(true)
    if (postLoginPath) setRedirectPath(postLoginPath)
  }

  const handleRedirect = () => {
    if (redirectPath !== '') {
      navigate(redirectPath)
      setRedirectPath('')
    }
  }

  useEffect(() => {
    if (user) {
      if (loginPage === LOGIN_PAGES.SIGN_UP) {
        setLoginPage(LOGIN_PAGES.CONFIRM_SIGNUP)
      } else if (loginPage === LOGIN_PAGES.SIGN_IN) {
        closeLogin()
      }
    }
  }, [user, loginPage])

  const value = { loginOpen, closeLogin, openLogin }

  return (
    <LoginUIContext.Provider value={value}>
      <LoginModal
        setPage={setLoginPage}
        page={loginPage}
        handleRedirect={handleRedirect}
        show={loginOpen}
        onHide={closeLogin}
      />
      {children}
    </LoginUIContext.Provider>
  )
}
