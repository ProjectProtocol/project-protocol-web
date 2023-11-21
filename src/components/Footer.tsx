import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type FooterLink = {
  url: string
  label: string
}

export default function Footer() {
  const { t } = useTranslation()

  const links = [
    { url: '/about', label: t('footer.about') },
    { url: '/how-does-it-work', label: t('footer.howDoesItWork') },
    { url: '/ethical-principles', label: t('footer.ethicalPrinciples') },
    { url: '/terms-of-service', label: t('footer.tos') },
    { url: '/contact-us', label: t('footer.contact') },
  ]

  return (
    <div className="bg-primary text-center py-4 mt-auto">
      {links.map(({ label, url }: FooterLink) => (
        <Link
          key={`footer-link-${label}`}
          className="me-5 text-body d-block d-md-inline my-3 text-decoration-none w-100 text-center"
          to={url}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
