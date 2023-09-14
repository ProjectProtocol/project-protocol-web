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
    <div className="d-flex flex-row align-items-center w-100 mb-2">
      <Col xs={6}>
        <h4 className="m-0">{rating.label}</h4>
      </Col>
      <Col>
        <ProgressBar
          variant="dark"
          now={liveValue}
          max={5}
          className="align-middle bg-gray-2"
          style={{ height: '10px' }}
        />
      </Col>
      <Col xs={1} className="text-center">
        <span>{rating.value}</span>
      </Col>
    </div>
  )
}
