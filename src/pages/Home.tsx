import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { useEffect } from 'react'
import loadingBar from 'src/util/loadingBar'
import LoginUIProvider from 'src/contexts/LoginUIProvider'

export default function Home() {
  const { user } = useAuth()
  const { state } = useNavigation()

  // Global loading indicator based on router activity
  useEffect(() => {
    if (state === 'loading') {
      loadingBar.show()
    } else {
      loadingBar.hide()
    }
  }, [state])

  return (
    <div className="bg-light bg-danger min-vh-100 d-flex flex-column">
      <ScrollRestoration />
      <LoginUIProvider>
        <Menu user={user} />
        <Container className="p-3" style={{ maxWidth: 600 }}>
          <Outlet />
        </Container>
        <Footer />
      </LoginUIProvider>
    </div>
  )
}
