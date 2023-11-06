import i18n from './i18n.ts'

type LanguageProps = {
  nativeName: string
}

type Languages = {
  [key: string]: LanguageProps
}

const lngs: Languages = {
  en: { nativeName: 'English' },
  es: { nativeName: 'Español' },
}

export default function LocaleSwitcher() {
  return (
    <div>
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          style={{
            fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
          }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng].nativeName}
        </button>
      ))}
    </div>
  )
}
