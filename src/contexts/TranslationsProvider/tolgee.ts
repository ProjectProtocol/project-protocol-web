import {
  Tolgee,
  DevTools,
  LanguageStorage,
  LanguageDetector,
  BackendFetch,
} from '@tolgee/react'
import { FormatIcu } from '@tolgee/format-icu'

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatIcu())
  .use(LanguageDetector())
  .use(LanguageStorage())
  .use(
    BackendFetch({
      prefix: 'https://cdn.tolg.ee/39569eaae5eec38d77a0693bbe71ce67',
    }),
  )
  .init({
    availableLanguages: ['en', 'es-MX'],
    defaultLanguage: 'en',
    fallbackLanguage: 'en',
    fallbackNs: 'shared',
    apiUrl: import.meta.env.VITE_APP_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_APP_TOLGEE_API_KEY,
  })

export function getCurrentLanguage(): string {
  return localStorage.getItem('__tolgee_currentLanguage') || 'en'
}

export default tolgee
