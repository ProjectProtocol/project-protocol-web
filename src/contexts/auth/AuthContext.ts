import { createContext, useContext } from "react"
import { Action, AuthState, Dispatch } from "./types"

const AuthContext = createContext<
  { state: AuthState; dispatch: Dispatch } | undefined
>(undefined)

function authReducer(state: AuthState, action: Action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.data }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used with an AuthProvider")
  }

  return context
}

export { AuthContext, authReducer, useAuth }
