import { useTranslation } from 'react-i18next'
import Comment from 'src/types/Comment'

interface IReviewCardComment {
  comment: Comment
  showModerationModal: () => void
}

export default function ReviewCardComment({
  comment,
  showModerationModal,
}: IReviewCardComment) {
  const { t } = useTranslation()
  const { body, status } = comment
  const isPublished = status === 'published'

  return (
    <div>
      <h4>{t('ratings.additionalComments')}</h4>
      {!isPublished && (
        <div
          className="bg-meyer-lemon bg-opacity-75 mb-3 rounded"
          style={{ padding: '12px' }}
        >
          <span>{t('ratings.unpublishedCommentHeader')}</span>{' '}
          <a className="link" role="button" onClick={showModerationModal}>
            {t('ratings.unpublishedCommentHeaderLink')}
          </a>
        </div>
      )}
      <p>{body}</p>
    </div>
  )
}
