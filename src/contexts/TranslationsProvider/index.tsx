import { TolgeeProvider } from '@tolgee/react'
import tolgee from './tolgee'

export default function TranslationsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TolgeeProvider tolgee={tolgee} fallback="Loading translations...">
      {children}
    </TolgeeProvider>
  )
}
