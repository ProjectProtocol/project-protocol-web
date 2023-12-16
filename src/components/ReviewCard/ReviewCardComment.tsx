import { Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

interface IReviewCardComment {
  isPending: boolean
  reviewInput?: string
}
export default function ReviewCardComment({
  isPending,
  reviewInput,
}: IReviewCardComment) {
  const { t } = useTranslation()

  const InnerComment = () => (
    <>
      <h4>{t('ratings.additionalComments')}</h4>
      <p>{reviewInput}</p>
    </>
  )

  return isPending ? (
    <Card className={'shadow-none border border-dark rounded-0'}>
      <Card.Header as="small" className="bg-meyer-lemon fw-normal">
        {t('ratings.unpublishedCommentHeader')}{' '}
        <a className="link">{t('ratings.unpublishedCommentHeaderLink')}</a>
      </Card.Header>
      <Card.Body>
        <InnerComment />
      </Card.Body>
    </Card>
  ) : (
    <InnerComment />
  )
}
