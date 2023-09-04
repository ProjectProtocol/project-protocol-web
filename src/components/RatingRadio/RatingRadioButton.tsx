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
      className="text-white fw-bold"
      variant={isActive ? `rating-${value}` : 'tertiary'}
      style={{ width: 50, height: 50 }}
      onClick={() => onClick(value)}
    >
      {value}
    </Button>
  )
}
