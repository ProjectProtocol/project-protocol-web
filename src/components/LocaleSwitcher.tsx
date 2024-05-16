import classNames from 'classnames'
import { useRevalidator } from 'react-router-dom'
import { useTolgee, useTranslate } from '@tolgee/react'

const languages = [
  ['en-US', 'English'],
  ['es-MX', 'Español'],
]

export default function LocaleSwitcher({ dark = false }: { dark?: boolean }) {
  const { t } = useTranslate()
  const tolgee = useTolgee(['language'])
  const currentLanguage = tolgee.getLanguage()
  const { revalidate } = useRevalidator()

  const activeClass = `fw-semibold ${dark ? 'text-white' : 'text-body'}`
  const inactiveClass = dark ? 'link-white' : 'link-dark'

  function changeLanguage(key: string) {
    if (currentLanguage !== key) {
      tolgee.changeLanguage(key).then(() => {
        revalidate()
      })
    }
  }

  return (
    <div
      aria-label={t('navigation.localeSwitcher.selectLanguage')}
      className="flex flex-row"
    >
      {languages.map(([key, label]) => {
        const active = key === currentLanguage
        return (
          <a
            key={`locale-switcher-${key}`}
            className={classNames('text-decoration-none px-2 py-1', {
              [activeClass]: active,
              [inactiveClass]: !active,
            })}
            role="button"
            onClick={() => changeLanguage(key)}
            lang={key}
          >
            {label}
          </a>
        )
      })}
    </div>
  )
}
