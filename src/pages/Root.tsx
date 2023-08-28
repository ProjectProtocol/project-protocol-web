import { useAuth } from '../contexts/auth/AuthContext'
import { useEffect } from 'react'
import Login from './Login'
import Home from './Home'
import { reauthenticate } from '../api'

export default function Root() {
  const { user, setUser } = useAuth()

  useEffect(() => {
    async function checkAuth() {
      const { user } = await reauthenticate()

      if (user) {
        setUser(user)
      }
    }

    if (!user) {
      checkAuth()
    }
  }, [user, setUser])

  return user ? <Home /> : <Login />
}
