import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import User from '../../types/User'
import { ApiSession } from 'src/api'
import toast from 'react-hot-toast'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User>()
  const [authLoading, setAuthLoading] = useState(false)

  // Add authLoading state to AuthProvider, move this into
  // AuthContext
  const handleLogout = async () => {
    setAuthLoading(true)
    await ApiSession.destroy()
    setAuthLoading(false)
    setUser(undefined)
    toast.success('Sign out successful!')
  }

  useEffect(() => {
    async function checkAuth() {
      const { user } = await ApiSession.reauthenticate()

      if (user) {
        setUser(user)
      }
    }

    if (!user) {
      checkAuth()
    }
  }, [user, setUser])

  const value = { user, setUser, authLoading, handleLogout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
