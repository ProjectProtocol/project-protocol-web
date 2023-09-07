import classNames from 'classnames'
import { MouseEventHandler } from 'react'
import { Badge } from 'react-bootstrap'

interface IRateAgentTag {
  tagName: string
  isActive: boolean
  onClick: MouseEventHandler<HTMLElement>
}

export default function RateAgentTag({
  tagName,
  isActive,
  onClick,
}: IRateAgentTag) {
  return (
    <Badge
      role="button"
      pill
      bg={isActive ? 'primary' : 'gray-2'}
      className={classNames('p-2 me-1 my-1 text-wrap', {
        'text-body': !isActive,
      })}
      onClick={onClick}
    >
      {tagName}
    </Badge>
  )
}
