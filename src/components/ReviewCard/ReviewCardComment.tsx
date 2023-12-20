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

  return (
    <div>
      <h4>{t('ratings.additionalComments')}</h4>
      {!isPublished && (
        <div
          className="bg-meyer-lemon bg-opacity-75 mb-3 rounded"
          style={{ padding: '12px' }}
        >
          <span>{t('ratings.unpublishedCommentHeader')}</span>{' '}
          <a
            className="link text-black"
            role="button"
            onClick={showModerationModal}
          >
            {t('ratings.unpublishedCommentHeaderLink')}
          </a>
        </div>
      )}
      <p>{reviewInput}</p>
    </div>
  )
}
