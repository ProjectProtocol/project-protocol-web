import { useTranslation } from 'react-i18next'
import { Tag, tagsTranslationMap } from 'src/types/Tag'
import { Review, Rating } from 'src/types/Review'
import Card from 'react-bootstrap/Card'
import TagBadge from '../TagBadge'
import RatingBar from '../RatingBar'
import ReviewCardComment from './ReviewCardComment'

interface IReviewCard {
  review: Review
}

export default function ReviewCard({ review }: IReviewCard) {
  const { reviewInput, id, isPending, ratings, tags } = review
  const { t } = useTranslation()
  const uiKey = `review-${id}`

  return (
    <Card body className="mb-3">
      <div className="mb-3">
        {ratings.map((r: Rating, i: number) => (
          <RatingBar rating={r} key={`${uiKey}-rating-${i}`} />
        ))}
      </div>
      <div className="mb-3">
        {tags.map((tag: Tag, i: number) => (
          <TagBadge
            label={t(tagsTranslationMap[tag.name])}
            className="me-2 mb-2 p-2"
            key={`${uiKey}-tag-${i}`}
          />
        ))}
      </div>
      {reviewInput && <ReviewCardComment {...{ isPending, reviewInput }} />}
    </Card>
  )
}
