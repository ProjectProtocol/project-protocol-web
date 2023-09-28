import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from 'src/contexts/auth/AuthContext'
import User from 'src/types/User'

export type AccountLayoutContext = { user: User; handleLogout: () => void }

/**
 * AccountLayout
 *
 * Checks for signed-in user. If present, provides user to children, else redirects to
 * root route.
 */
export default function AccountLayout() {
  const { user, handleLogout } = useAuth()

  if (!user) {
    console.log('what the fuck')
    return <Navigate to="/" />
  }

  return (
    <Outlet context={{ user, handleLogout } satisfies AccountLayoutContext} />
  )
}
