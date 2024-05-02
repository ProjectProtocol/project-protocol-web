import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { Suspense, useEffect } from 'react'
import loadingBar from 'src/util/loadingBar'
import LoginUIProvider from 'src/contexts/LoginUIProvider'
import LoadingPlaceholder from 'src/components/LoadingPlaceholder'
import MobileTabs from 'src/components/Menu/MobileTabs'

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
    <div className="bg-light min-vh-100 d-flex flex-column">
      <ScrollRestoration />
      <LoginUIProvider>
        <Menu user={user} />
        <Container className="p-3" style={{ maxWidth: 935 }}>
          <Suspense fallback={<LoadingPlaceholder />}>
            <Outlet />
          </Suspense>
        </Container>
        <Footer />
        <MobileTabs />
      </LoginUIProvider>
    </div>
  )
}
