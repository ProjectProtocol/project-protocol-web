import i18n from './i18n.ts'
import { useTranslation } from 'react-i18next'

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
      lang={currentLang}
    >
      {isCurrentLng ? <strong>{nativeName}</strong> : nativeName}
    </button>
  )
}

export default function LocaleSwitcher() {
  const { t } = useTranslation()

  return (
    <div
      className="btn-group"
      role="group"
      aria-label={t('navigation.localeSwitcher.selectLanguage')}
    >
      {Object.keys(languages).map((lng) => (
        <Button currentLang={lng} />
      ))}
    </div>
  )
}
