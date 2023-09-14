import { Badge, BadgeProps } from 'react-bootstrap'

interface ITagBadge extends BadgeProps {
  label: string
}
/** Small wrapper around react-bootstrap/Badge component */
export default function TagBadge({ label, ...props }: ITagBadge) {
  return (
    <Badge pill bg="tertiary" {...props}>
      <span className="fw-medium">{label}</span>
    </Badge>
  )
}
