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
      className={classNames('fw-bold', { 'text-white': isActive && value < 4 })}
      variant={isActive ? `rating-${value}` : 'outline-dark'}
      style={{ width: 50, height: 50 }}
      onClick={() => onClick(value)}
    >
      {value}
    </Button>
  )
}
