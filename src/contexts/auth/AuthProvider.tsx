import { useEffect, useMemo, useState } from 'react'
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
  const [firstLoad, setFirstLoad] = useState(true)
  // Add authLoading state to AuthProvider, move this into
  // AuthContext
  const handleLogout = async () => {
    setAuthLoading(true)
    await ApiSession.destroy()
    setAuthLoading(false)
    setUser(undefined)
    toast.success('Sign out successful!')
  }

  const isSignedIn = useMemo(() => !!user, [user])

  async function refreshUser() {
    const { user } = await ApiSession.reauthenticate()

    if (user) {
      setUser(user)
    }
    setFirstLoad(false)
  }

  useEffect(() => {
    if (!user && firstLoad) {
      refreshUser()
    }
  }, [user, firstLoad])

  const value = {
    user,
    setUser,
    authLoading,
    handleLogout,
    isSignedIn,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {!firstLoad && children}
    </AuthContext.Provider>
  )
}
