import { Col, ProgressBar } from 'react-bootstrap'
import { Rating } from '../types/Review'
import { useEffect, useState } from 'react'

interface IRatingBar {
  /** Label and value (out of 5) is taken from the rating object */
  rating: Rating
  /** Add a delay to the bar rendering */
  animated?: boolean
  /** Multiple delay by a factor of this number */
  delay?: number
}

export default function RatingBar({ rating, animated, delay }: IRatingBar) {
  const [liveValue, setLiveValue] = useState(animated ? 0 : rating.value)

  useEffect(() => {
    function updateValue() {
      setLiveValue(rating.value)
    }

    if (animated) {
      setTimeout(updateValue, 250 * (delay || 1))
    }
  }, [rating, animated, delay])

  return (
    <div className="d-flex flex-row align-items-center w-100 mb-1">
      <Col xs={4}>
        <h4 className="m-0">{rating.label}</h4>
      </Col>
      <Col>
        <ProgressBar
          variant="secondary"
          now={liveValue}
          max={5}
          className="align-middle me-2"
        />
      </Col>
      <Col xs="auto">
        <span>{rating.value}</span>
      </Col>
    </div>
  )
}
