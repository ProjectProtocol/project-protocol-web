import { Tolgee, DevTools, FormatSimple, LanguageStorage } from '@tolgee/react'

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .use(LanguageStorage())
  .init({
    availableLanguages: ['en', 'es-MX'],
    defaultLanguage: 'en',
    apiUrl: import.meta.env.VITE_APP_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_APP_TOLGEE_API_KEY,
  })

export default tolgee
