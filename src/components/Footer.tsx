import { Link } from 'react-router-dom'

type FooterLink = {
  url: string
  label: string
}
const links = [
  { url: '/about', label: 'About' },
  { url: '/how-does-it-work', label: 'How does it work?' },
  { url: '/ethical-principles', label: 'Ethical principles' },
  { url: '/terms-of-service', label: 'Terms of service' },
  { url: '/contact-us', label: 'Contact us' },
]

export default function Footer() {
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
