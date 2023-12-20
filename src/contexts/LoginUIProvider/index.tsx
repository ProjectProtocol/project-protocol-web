import { useEffect, useState } from 'react'
import { LOGIN_PAGES } from 'src/components/LoginModal/constants'
import { useAuth } from '../auth/AuthContext'
import LoginModal from 'src/components/LoginModal'
import { LoginUIContext } from './LoginUIContext'

export default function LoginUIProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const [loginOpen, setLoginOpen] = useState(!!user)
  const [loginPage, setLoginPage] = useState(LOGIN_PAGES.SIGN_IN)

  const closeLogin = () => setLoginOpen(false)

  const openLogin = (page: number) => {
    setLoginPage(page)
    setLoginOpen(true)
  }

  useEffect(() => {
    if (user) {
      closeLogin()
    }
  }, [user])

  const value = { loginOpen, closeLogin, openLogin }

  return (
    <LoginUIContext.Provider value={value}>
      <LoginModal
        setPage={setLoginPage}
        page={loginPage}
        show={loginOpen}
        onHide={closeLogin}
      />
      {children}
    </LoginUIContext.Provider>
  )
}
