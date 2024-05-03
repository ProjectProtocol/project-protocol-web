import { useTranslate } from '@tolgee/react'
import { Link } from 'react-router-dom'

type FooterLink = {
  url: string
  label: string
}

export default function Footer() {
  const { t } = useTranslate('navigation')

  const links = [
    { url: '/about', label: t('about') },
    { url: '/how-does-it-work', label: t('howDoesItWork') },
    { url: '/ethical-principles', label: t('ethicalPrinciples') },
    { url: '/terms-of-service', label: t('termsOfService') },
    { url: '/contact-us', label: t('contact') },
  ]

  return (
    <div
      className="bg-dark text-center mt-auto py-md-4 pt-4"
      style={{ paddingBottom: '100px' }}
    >
      {links.map(({ label, url }: FooterLink) => (
        <Link
          key={`footer-link-${label}`}
          className="mx-3 my-3 d-block d-md-inline text-center link-white link-underline-opacity-0"
          to={url}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
