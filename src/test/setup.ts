import '@testing-library/jest-dom/vitest'

beforeEach(() => {
  vi.mock('@tolgee/react', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslate: () => {
      return {
        t: (str: string) => {
          return str
        },
      }
    },
    T: ({
      keyName,
    }: {
      keyName: string
      ns: string
      params: Record<string, string>
    }) => {
      return keyName
    },
    Tolgee: () => ({
      use: () => ({}),
      init: () => ({}),
    }),
    useTolgee: () => ({
      getLanguage: () => 'en',
    }),
  }))
})

afterEach(() => {
  vi.restoreAllMocks()
})
