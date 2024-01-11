import { createContext, useContext } from 'react'

export type OpenLoginOptions = {
  callback?: () => void
}

export type OpenLogin = (page: number, options?: OpenLoginOptions) => void

type LoginUIState = {
  loginOpen: boolean
  closeLogin: () => void
  openLogin: OpenLogin
}

const LoginUIContext = createContext<LoginUIState | undefined>(undefined)

function useLogin() {
  const context = useContext(LoginUIContext)
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginUIProvider')
  }

  return context
}

export { LoginUIContext, useLogin }
