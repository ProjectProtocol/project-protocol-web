import { ReactNode } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface ILandingPageCard {
  icon: ReactNode
  href: string
  title: string
  description: string
  cardClass: string
}

export default function LandingPageCard({
  cardClass,
  href,
  icon,
  title,
  description,
}: ILandingPageCard) {
  return (
    <Link to={href} className="text-decoration-none">
      <Card body className={`${cardClass} home-card-gradient shadow`}>
        <h4>{title}</h4>
        <p className="m-0">{description}</p>
        <div className="d-flex flex-row justify-content-end">{icon}</div>
      </Card>
    </Link>
  )
}
