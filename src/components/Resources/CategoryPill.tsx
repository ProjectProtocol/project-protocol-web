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
      className={classNames('text-decoration-none fw-medium', {
        'border border-tertiary bg-gray-1 text-tertiary': !active,
        'bg-tertiary text-white': active,
      })}
    >
      {label}
    </Badge>
  )
}
