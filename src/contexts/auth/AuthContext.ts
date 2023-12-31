import { createContext, useContext } from 'react'
import User from '../../types/User'

type AuthProviderValue = {
  user?: User
  isSignedIn: boolean
  setUser: (user?: User) => void
  handleLogout: () => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthProviderValue | undefined>(undefined)

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used with an AuthProvider')
  }

  return context
}

export { AuthContext, useAuth }
