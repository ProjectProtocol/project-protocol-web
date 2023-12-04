import { Provider, ErrorBoundary } from '@rollbar/react'
import { Configuration } from 'rollbar'

const rollbarConfig: Configuration = {
  accessToken: '193b4f35ab424d7ba68b09ca6a046067',
  environment: import.meta.env.VITE_ENVIRONMENT || import.meta.env.MODE,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: import.meta.env.PROD,
  payload: {
    environment: import.meta.env.VITE_ENVIRONMENT,
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: process.env.COMMIT_REF,
        guess_uncaught_frames: true,
      },
    },
  },
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
