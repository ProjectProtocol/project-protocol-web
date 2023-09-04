import { Button } from 'react-bootstrap'

interface IRatingRadioButton {
  isActive: boolean
  value: number
}
export default function RatingRadioButton({
  isActive,
  value,
}: IRatingRadioButton) {
  return (
    <Button
      className="text-white fw-bold"
      variant={isActive ? `rating-${value}` : 'tertiary'}
      style={{ width: 50, height: 50 }}
    >
      {value}
    </Button>
  )
}
