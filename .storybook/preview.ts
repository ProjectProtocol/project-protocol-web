import i18n from './i18next';
import type { Preview } from "@storybook/react"
import "../src/styles/index.scss"

const preview: Preview = {
  globals: {
    locale: 'en',
    locales: {
        en: 'English',
        es: 'Español',
    },
  },
  parameters: {
    i18n,
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
