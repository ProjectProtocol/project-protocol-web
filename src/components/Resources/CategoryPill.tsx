import classNames from 'classnames'
import Badge from 'react-bootstrap/Badge'
import { Link } from 'react-router-dom'
import { ResourceCategoryType } from 'src/types/contentful-types'

interface ICategoryPill {
  active: boolean
  href: string
  label: ResourceCategoryType
}
export default function CategoryPill({ active, label, href }: ICategoryPill) {
  return (
    <Badge
      pill
      as={Link}
      to={href}
      className={classNames('text-decoration-none fw-medium', {
        'border border-dark bg-gray-1 text-dark': !active,
        'bg-dark text-white': active,
      })}
    >
      {label}
    </Badge>
  )
}
