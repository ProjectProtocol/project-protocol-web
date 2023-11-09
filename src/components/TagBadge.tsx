import { Badge, BadgeProps } from 'react-bootstrap'

interface ITagBadge extends BadgeProps {
  label: string
}
/** Small wrapper around react-bootstrap/Badge component */
export default function TagBadge({ label, ...props }: ITagBadge) {
  return (
    <Badge pill bg="gray-3" {...props}>
      <span>{label}</span>
    </Badge>
  )
}
