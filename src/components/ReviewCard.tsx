import Card from "react-bootstrap/Card"
import { Review, Rating, Tag } from "../types/Review"
import TagBadge from "./TagBadge"
import RatingBar from "./RatingBar"

interface IReviewCard {
  review: Review
}

export default function ReviewCard({ review }: IReviewCard) {
  const uiKey = `review-${review.id}`

  return (
    <Card body className="mb-3">
      <div className="mb-3">
        {review.ratings.map((r: Rating, i: number) => (
          <RatingBar rating={r} key={`${uiKey}-rating-${i}`} />
        ))}
      </div>
      <div className="mb-3">
        {review.tags.map((t: Tag, i: number) => (
          <TagBadge
            label={t.translations["en"]}
            className="me-2 mb-2 p-2"
            key={`${uiKey}-tag-${i}`}
          />
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
