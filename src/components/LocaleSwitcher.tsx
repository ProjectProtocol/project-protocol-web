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
  es: { nativeName: 'Spanish' },
}

export default function LocaleSwitcher() {
  const { t } = useTranslation()
  const { revalidate } = useRevalidator()

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
              'fw-semibold text-body': active,
              'link-dark': !active,
            })}
            role="button"
            onClick={() => {
              i18n.resolvedLanguage !== lng &&
                i18n.changeLanguage(lng, revalidate)
            }}
            lang={lng}
          >
            {i18n.resolvedLanguage === lng ? <strong>{label}</strong> : label}
          </a>
        )
      })}
    </div>
  )
}
