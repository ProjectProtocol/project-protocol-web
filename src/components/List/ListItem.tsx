import classNames from 'classnames'
import { Card } from 'react-bootstrap'
import usePointerState from 'src/hooks/usePointerState'

export interface IListItem {
  onClick?: () => void
  children: React.ReactNode
  cardClasses?: string
}
export default function ListItem({
  children,
  onClick,
  cardClasses,
}: IListItem) {
  const { hover, pressActive, pointerHandlers } = usePointerState()

  return (
    <Card
      body
      {...pointerHandlers}
      className={classNames(`pe-auto border-0 ${cardClasses}`, {
        shadow: hover,
        'shadow-sm': !hover,
        'bg-tertiary-subtle shadow-none': pressActive,
        'bg-white': !pressActive,
      })}
      style={{ transition: 'box-shadow 0.5s' }}
      onClick={onClick}
      role={onClick ? 'button' : ''}
    >
      {children}
    </Card>
  )
}
