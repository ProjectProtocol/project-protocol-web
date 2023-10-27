import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import { useAuth } from 'src/contexts/auth/AuthContext'
import LoginModal from 'src/components/LoginModal'
import { useEffect, useState } from 'react'
import { LOGIN_PAGES } from 'src/components/LoginModal/constants'
import loadingBar from 'src/util/loadingBar'

export default function Home() {
  const { user } = useAuth()
  const [showLogin, setShowLogin] = useState(!!user)
  const [loginPage, setLoginPage] = useState(LOGIN_PAGES.SIGN_IN)
  const { state } = useNavigation()
  const openLogin = (page: number) => {
    setLoginPage(page)
    setShowLogin(true)
  }

  // Global loading indicator based on router activity
  useEffect(() => {
    if (state === 'loading') {
      loadingBar.show()
    } else {
      loadingBar.hide()
    }
  }, [state])

  useEffect(() => {
    if (user) {
      setShowLogin(false)
    }
  }, [user])

  return (
    <div className="bg-light bg-danger min-vh-100 d-flex flex-column ">
      <ScrollRestoration />
      <Menu user={user} openLogin={openLogin} />
      <LoginModal
        setPage={setLoginPage}
        page={loginPage}
        show={showLogin}
        onHide={() => setShowLogin(false)}
      />
      <Container className="p-3" style={{ maxWidth: 600 }}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  )
}
