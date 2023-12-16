import { Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

interface IReviewCardComment {
  isPublished: boolean
  reviewInput: string
  showModerationModal: () => void
}
export default function ReviewCardComment({
  isPublished,
  reviewInput,
  showModerationModal,
}: IReviewCardComment) {
  const { t } = useTranslation()

  const InnerComment = () => (
    <div>
      <h4 className="mb-1">{t('ratings.additionalComments')}</h4>
      <p className="">{reviewInput}</p>
    </div>
  )

  return isPublished ? (
    <InnerComment />
  ) : (
    <Card className={'shadow-none border border-dark'}>
      <Card.Header as="small" className="bg-meyer-lemon fw-normal rounded-top">
        <span>{t('ratings.unpublishedCommentHeader')}</span>{' '}
        <a className="link" onClick={showModerationModal}>
          {t('ratings.unpublishedCommentHeaderLink')}
        </a>
      </Card.Header>
      <Card.Body>
        <InnerComment />
      </Card.Body>
    </Card>
  )
}
