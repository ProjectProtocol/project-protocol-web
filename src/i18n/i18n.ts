import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enLocaleStrings from './en.json'
import esLocaleStrings from './es.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: enLocaleStrings,
      },
      es: {
        translation: esLocaleStrings,
      },
    },
  })

export default i18n
