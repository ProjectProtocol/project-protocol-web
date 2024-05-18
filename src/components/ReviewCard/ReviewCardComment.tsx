import { useTranslate } from '@tolgee/react'
import Comment from 'src/types/Comment'

interface IReviewCardComment {
  comment: Comment
  showModerationModal: () => void
}

export default function ReviewCardComment({
  comment,
  showModerationModal,
}: IReviewCardComment) {
  const { t } = useTranslate('rate_agent')
  const { body, status } = comment
  const isPublished = status === 'published'

  return (
    <div>
      <h4>{t('additionalComments')}</h4>
      {!isPublished && (
        <div
          className="bg-meyer-lemon bg-opacity-75 mb-3 rounded"
          style={{ padding: '12px' }}
        >
          <span>{t('unpublishedCommentHeader')}</span>{' '}
          <a className="link" role="button" onClick={showModerationModal}>
            {t('unpublishedCommentHeaderLink')}
          </a>
        </div>
      )}
      <p>{body}</p>
    </div>
  )
}
