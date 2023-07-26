import { useReducer } from "react"
import { AuthContext, authReducer } from "./AuthContext"
import User from "../../types/User"

const user: User = { email: "herp@derp.com" }

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(authReducer, { user })
  const value = { state, dispatch }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
