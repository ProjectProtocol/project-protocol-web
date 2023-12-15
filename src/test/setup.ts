import { isEmpty } from 'lodash'

beforeEach(() => {
  vi.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
      return {
        t: (str: string, opts: Record<string, string> = {}) => {
          const optionValues = isEmpty(opts)
            ? ''
            : ' ' + Object.values(opts).join(' ')

          return str + optionValues
        },

        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      }
    },
    initReactI18next: {
      type: '3rdParty',
      init: () => {},
    },
  }))
})

afterEach(() => {
  vi.restoreAllMocks()
})
