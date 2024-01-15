import { LoaderFunctionArgs } from 'react-router-dom'
import createStaticPageLoader, {
  contentIds,
} from 'src/loaders/staticPageLoader'
import ContentfulClient from 'src/util/ContentfulClient'
import i18n from 'src/i18n'

vi.mock('src/i18n', () => ({
  default: { resolvedLanguage: 'en' },
}))

vi.mock('src/util/ContentfulClient', () => ({
  default: {
    getEntry: vi.fn().mockResolvedValue({ sys: { id: 'abc123' } }),
  },
}))

describe('createStaticPageLoader', () => {
  describe('generated loader', () => {
    const dummyLoaderArgs = { params: {}, request: {} } as LoaderFunctionArgs
    it("generatesloader that returns an entry from Contentful's API", async () => {
      const loader = createStaticPageLoader('ABOUT_US')
      const entry = await loader(dummyLoaderArgs)
      expect(entry).toHaveProperty('sys.id')
    })

    it('requests the correct locale for english', async () => {
      const loader = createStaticPageLoader('ABOUT_US')
      vi.spyOn(i18n, 'resolvedLanguage', 'get').mockReturnValue('en')
      await loader(dummyLoaderArgs)

      expect(ContentfulClient.getEntry).toHaveBeenCalledWith(
        contentIds.ABOUT_US,
        { locale: 'en-US' },
      )
    })

    it('requests the correct locale for spanish', async () => {
      const loader = createStaticPageLoader('ABOUT_US')
      vi.spyOn(i18n, 'resolvedLanguage', 'get').mockReturnValue('es')

      await loader(dummyLoaderArgs)

      expect(ContentfulClient.getEntry).toHaveBeenCalledWith(
        contentIds.ABOUT_US,
        { locale: 'es-US' },
      )
    })

    it('defaults to en-US if i18n language is not known', async () => {
      const loader = createStaticPageLoader('ABOUT_US')
      vi.spyOn(i18n, 'resolvedLanguage', 'get').mockReturnValue('fake-lang')

      await loader(dummyLoaderArgs)

      expect(ContentfulClient.getEntry).toHaveBeenCalledWith(
        contentIds.ABOUT_US,
        { locale: 'en-US' },
      )
    })
  })
})
