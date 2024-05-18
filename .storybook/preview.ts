import type { Preview } from "@storybook/react"
import "../src/styles/index.scss"

const preview: Preview = {
  globals: {
    locale: 'en',
  },
  parameters: {
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
