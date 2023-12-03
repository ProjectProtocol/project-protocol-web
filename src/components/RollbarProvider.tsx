import { Provider, ErrorBoundary } from '@rollbar/react'
import { Configuration } from 'rollbar'

const rollbarConfig: Configuration = {
  accessToken: '193b4f35ab424d7ba68b09ca6a046067',
  environment: import.meta.env.VITE_ENVIRONMENT || import.meta.env.MODE,
  enabled: import.meta.env.PROD,
}

export default function RollbarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Provider>
  )
}
