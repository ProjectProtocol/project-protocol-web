import classNames from 'classnames'
import { Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ResourceCategoryType } from 'src/types/contentful-types'
import resourceCategoryColor from 'src/util/resourceCategoryColor'

interface ICategoryPill {
  active: boolean
  label: ResourceCategoryType
}
export default function CategoryPill({ active, label }: ICategoryPill) {
  return (
    <Badge
      pill
      as={Link}
      to={active ? '' : '?category=' + label}
      className={classNames('text-decoration-none fw-medium', {
        'bg-light text-dark': !active,
        [`${resourceCategoryColor(label)}`]: active,
      })}
    >
      {label}
    </Badge>
  )
}
