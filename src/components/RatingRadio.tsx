import { Button } from 'react-bootstrap'

interface IRatingRadio {
  title: string
  titleHelper: string
  helperLeft: string
  helperRight: string
  currentValue?: number
  onChange: (v: number) => void
  containerClass?: string
}

interface IRatingRadioButton {
  onClick: (v: number) => void
  isActive: boolean
  value: number
}
function RatingRadioButton({ onClick, isActive, value }: IRatingRadioButton) {
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

export default function RatingRadio({
  title,
  helperLeft,
  helperRight,
  titleHelper,
  currentValue,
  onChange,
  containerClass,
}: IRatingRadio) {
  return (
    <div className={containerClass}>
      <h4>{title}</h4>
      <p>{titleHelper}</p>
      <div className="d-flex flex-row justify-content-between mb-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <RatingRadioButton
            value={n}
            key={[title, 'button', n].join('-')}
            onClick={onChange}
            isActive={currentValue === n}
          />
        ))}
      </div>
      <div className="d-flex flex-row justify-content-between small">
        <span>{helperLeft}</span>
        <span>{helperRight}</span>
      </div>
    </div>
  )
}
