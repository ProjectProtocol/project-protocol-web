import classNames from 'classnames'
import i18n from '../i18n.ts'
import { useTranslation } from 'react-i18next'
import { useRevalidator } from 'react-router-dom'

type LanguageProps = {
  nativeName: string
}

type Languages = {
  [key: string]: LanguageProps
}

const languages: Languages = {
  en: { nativeName: 'English' },
  es: { nativeName: 'Español' },
}

export default function LocaleSwitcher({ dark = false }: { dark?: boolean }) {
  const { t } = useTranslation()
  const { revalidate } = useRevalidator()
  const activeClass = `fw-semibold ${dark ? 'text-white' : 'text-body'}`
  const inactiveClass = dark ? 'link-white' : 'link-dark'
  return (
    <div
      aria-label={t('navigation.localeSwitcher.selectLanguage')}
      className="flex flex-row"
    >
      {Object.keys(languages).map((lng) => {
        const label = languages[lng].nativeName
        const active = lng === i18n.resolvedLanguage
        return (
          <a
            key={`locale-switcher-${lng}`}
            className={classNames('text-decoration-none px-2 py-1', {
              [activeClass]: active,
              [inactiveClass]: !active,
            })}
            role="button"
            onClick={() => {
              i18n.resolvedLanguage !== lng &&
                i18n.changeLanguage(lng, revalidate)
            }}
            lang={lng}
          >
            {label}
          </a>
        )
      })}
    </div>
  )
}
