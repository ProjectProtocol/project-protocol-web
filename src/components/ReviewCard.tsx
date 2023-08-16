import Card from "react-bootstrap/Card"
import { Review, Rating, Tag } from "../types/Review"
import { Badge, Col, ProgressBar, Row } from "react-bootstrap"
import { useEffect, useState } from "react"

interface IReviewCard {
  review: Review
}
export default function ReviewCard({ review }: IReviewCard) {
  const [ratingBars, setRatingBars] = useState(
    new Array(review.ratings.length).fill(0)
  )

  useEffect(() => {
    function updateBars() {
      setRatingBars(review.ratings.map((r) => r.value))
    }

    setTimeout(updateBars, 250)
  })

  return (
    <Card body className="mb-3">
      <div className="mb-3">
        {review.ratings.map((r: Rating, i: number) => (
          <Row className="align-items-center mb-1 flex-nowrap">
            <Col xs={5}>
              <h4 className="m-0">{r.label}</h4>
            </Col>
            <Col>
              <ProgressBar
                variant="secondary"
                now={ratingBars[i]}
                max={5}
                className="align-middle"
              />
            </Col>
            <Col xs={1}>
              <span>{r.value}</span>
            </Col>
          </Row>
        ))}
      </div>
      <div className="mb-3">
        {review.tags.map((t: Tag) => (
          <Badge pill bg="secondary" className="me-2 mb-2 p-2">
            <span className="fw-normal">{t.translations["en"]}</span>
          </Badge>
        ))}
      </div>
      {review.reviewInput && (
        <>
          <h4>Additional Comments</h4>
          <p>{review.reviewInput}</p>
        </>
      )}
    </Card>
  )
}
