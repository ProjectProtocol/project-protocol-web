import { useReducer } from "react"
import { AuthContext, authReducer } from "./AuthContext"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(authReducer, { user: undefined })

  const value = { state, dispatch }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
