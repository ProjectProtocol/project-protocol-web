import classNames from 'classnames'
import Badge from 'react-bootstrap/Badge'
import { Link } from 'react-router-dom'

interface ICategoryPill {
  active: boolean
  href?: string
  label: string
}

export default function CategoryPill({ active, label, href }: ICategoryPill) {
  return (
    <Badge
      pill
      as={Link}
      to={href || `?category=${label}`}
      className={classNames('text-decoration-none border border-dark ', {
        'bg-white text-dark': !active,
        'bg-dark text-white': active,
      })}
    >
      {label}
    </Badge>
  )
}
