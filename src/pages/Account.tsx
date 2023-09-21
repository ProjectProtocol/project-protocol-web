import { Navigate } from 'react-router-dom'
import { useAuth } from 'src/contexts/auth/AuthContext'

export default function Account() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/" />

  return (
    <>
      <h1>Account</h1>
      <p>What up {user.email}</p>
    </>
  )
}
