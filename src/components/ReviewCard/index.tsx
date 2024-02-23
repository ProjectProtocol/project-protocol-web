import { useTranslation } from 'react-i18next'
import { Tag, tagsTranslationMap } from 'src/types/Tag'
import { Review, Rating } from 'src/types/Review'
import Card from 'react-bootstrap/Card'
import TagBadge from '../TagBadge'
import RatingBar from '../RatingBar'
import ReviewCardComment from './ReviewCardComment'

interface IReviewCard {
  review: Review
  showModerationModal: () => void
}

export default function ReviewCard({
  review,
  showModerationModal,
}: IReviewCard) {
  const { comment, id, ratings, tags } = review
  const { t } = useTranslation()
  const uiKey = `review-${id}`

  return (
    <Card body>
      <div className="vertical-rhythm-sm">
        <div>
          {ratings.map((r: Rating, i: number) => (
            <RatingBar rating={r} key={`${uiKey}-rating-${i}`} />
          ))}
        </div>
        <div>
          {tags.map((tag: Tag, i: number) => (
            <TagBadge
              label={t(tagsTranslationMap[tag.name])}
              className="me-2 mb-2 p-2"
              key={`${uiKey}-tag-${i}`}
            />
          ))}
        </div>
        {comment && <ReviewCardComment {...{ comment, showModerationModal }} />}
      </div>
    </Card>
  )
}
