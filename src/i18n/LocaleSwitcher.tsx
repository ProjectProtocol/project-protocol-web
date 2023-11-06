import i18n from './i18n.ts'

type LanguageProps = {
  nativeName: string
}

type Languages = {
  [key: string]: LanguageProps
}

const languages: Languages = {
  en: { nativeName: 'En' },
  es: { nativeName: 'Es' },
}

interface IButton {
  currentLang: string
}

const Button = ({ currentLang }: IButton) => {
  const isCurrentLng = i18n.resolvedLanguage === currentLang
  const nativeName = languages[currentLang].nativeName

  return (
    <button
      className="btn btn-default btn-sm"
      key={currentLang}
      type="submit"
      onClick={() => i18n.changeLanguage(currentLang)}
    >
      {isCurrentLng ? <strong>{nativeName}</strong> : nativeName}
    </button>
  )
}

export default function LocaleSwitcher() {
  return (
    <div className="btn-group" role="group" aria-label="...">
      {Object.keys(languages).map((lng) => (
        <Button currentLang={lng} />
      ))}
    </div>
  )
}
