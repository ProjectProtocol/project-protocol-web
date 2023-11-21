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
    <div className="bg-white text-center p-4 mt-auto">
      {links.map(({ label, url }: FooterLink) => (
        <Link
          key={`footer-link-${label}`}
          className="mx-3 my-3 d-block d-md-inline text-center"
          to={url}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
