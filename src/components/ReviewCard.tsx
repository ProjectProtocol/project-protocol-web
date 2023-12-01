import { useTranslation } from 'react-i18next'
import Card from 'react-bootstrap/Card'
import { Review, Rating } from '../types/Review'
import TagBadge from './TagBadge'
import RatingBar from './RatingBar'
import { Tag, tagsTranslationMap } from 'src/types/Tag'

interface IReviewCard {
  review: Review
}

export default function ReviewCard({ review }: IReviewCard) {
  const { t } = useTranslation()
  const uiKey = `review-${review.id}`

  return (
    <Card body className="mb-3">
      <div className="mb-3">
        {review.ratings.map((r: Rating, i: number) => (
          <RatingBar rating={r} key={`${uiKey}-rating-${i}`} />
        ))}
      </div>
      <div className="mb-3">
        {review.tags.map((tag: Tag, i: number) => (
          <TagBadge
            label={t(tagsTranslationMap[tag.name])}
            className="me-2 mb-2 p-2"
            key={`${uiKey}-tag-${i}`}
          />
        ))}
      </div>
      {review.reviewInput && (
        <>
          <h4>{t('ratings.additionalComments')}</h4>
          <p>{review.reviewInput}</p>
        </>
      )}
    </Card>
  )
}
