import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n.use(Backend).use(initReactI18next).init({
  fallbackLng: 'en',
})

// Revert this change to standard implementation after translations are released.
// See: https://github.com/i18next/i18next-browser-languageDetector#detector-options
i18n.use(LanguageDetector).init({
  detection: {
    order: ['cookie', 'localStorage', 'sessionStorage'],
  },
})

export default i18n
