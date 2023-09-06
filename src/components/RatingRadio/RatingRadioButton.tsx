import classNames from 'classnames'
import { Button } from 'react-bootstrap'

interface IRatingRadioButton {
  onClick: (v: number) => void
  isActive: boolean
  value: number
}
export default function RatingRadioButton({
  onClick,
  isActive,
  value,
}: IRatingRadioButton) {
  return (
    <Button
      className={classNames('fw-bold', { 'text-white': isActive })}
      variant={isActive ? `rating-${value}` : 'gray-2'}
      style={{ width: 50, height: 50 }}
      onClick={() => onClick(value)}
    >
      {value}
    </Button>
  )
}
