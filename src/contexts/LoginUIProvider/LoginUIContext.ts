import { createContext, useContext } from 'react'

type LoginUIState = {
  loginOpen: boolean
  closeLogin: () => void
  openLogin: (page: number, postLoginPath?: string) => void
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
