import { useCallback, useState } from "react"
import { AuthContext } from "./AuthContext"
import User from "../../types/User"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User>()

  const value = { user, setUser }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
