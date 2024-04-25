import { useLoaderData, useRevalidator } from 'react-router-dom'
import AgentInfo from '../components/AgentInfo'
import { AgentLoaderReturn } from '../loaders/agentLoader'
import { Rating, Review } from '../types/Review'
import ReviewCard from '../components/ReviewCard'
import { useState } from 'react'
import RateAgentModal from '../components/RateAgentModal'
import RatingBar from '../components/RatingBar'
import { IRateAgentFormState } from 'src/components/RateAgentModal/form-types'
import { ApiReviews } from 'src/api'
import toast from 'react-hot-toast'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { Tag, tagsTranslationMap } from 'src/types/Tag'
import TagBadge from 'src/components/TagBadge'
import { useTranslation } from 'react-i18next'
import ConfirmationModal from 'src/components/ConfirmationModal'
import RateAgentButton from 'src/components/Agent/RateAgentButton'
import { useLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'
import ModerationInfoModal from 'src/components/ModerationInfoModal'
import AnimatedList from 'src/components/AnimatedList'
import PageHeader from 'src/components/PageHeader'

export default function AgentView() {
  const { agent, reviews } = useLoaderData() as AgentLoaderReturn
  const { user } = useAuth()
  const { openLogin } = useLogin()
  const [showRateAgentModal, setShowRateAgentModal] = useState(false)
  const [showModerationModal, setShowModerationModal] = useState(false)
  const revalidator = useRevalidator()
  const { t } = useTranslation()

  const [showConfirmToRateModal, setShowConfirmToRateModal] = useState(false)

  const closeModal = (refreshAgent = false) => {
    if (refreshAgent) {
      revalidator.revalidate()
    }
    setShowRateAgentModal(false)
  }

  const onSubmit = async (data: IRateAgentFormState) => {
    const reviewSuccess = await ApiReviews.create(agent.id, data)

    if (reviewSuccess) {
      data.reviewInput && data.reviewInput.length > 0
        ? toast.success(t('ratings.createdWithCommentSuccess'))
        : toast.success(t('ratings.createdSuccess'))

      closeModal(true)
    } else {
      toast.error(t('error.generic'))
      closeModal()
    }
  }

  return (
    <>
      <PageHeader title={''} showBack />
      <div className="d-flex flex-row my-3">
        <div className="w-100">
          <AgentInfo agent={agent} />
        </div>
        <div className="d-flex flex-column justify-content-end">
          <div
            className="position-relative mb-3 text-center"
            style={{ minWidth: 150 }}
          >
            <h4 className="mb-0">{t('agent.averageRatingTitle')}</h4>
            <span className="h2 fw-bold m-0">{agent.averageRating}</span>
            <span
              className="fw-bold"
              style={{ marginLeft: 2, position: 'relative', top: -10 }}
            >
              /5
            </span>
          </div>
          <RateAgentButton
            openLogin={openLogin}
            isLoading={revalidator.state !== 'idle'}
            revalidate={revalidator.revalidate}
            showRatingModal={() => setShowRateAgentModal(true)}
            showConfirmationModal={() => setShowConfirmToRateModal(true)}
            isRateable={!!agent.isRateable}
            user={user}
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="fw-normal mb-2 small">{t('agent.overallRatings')}</div>
        {agent.overallStats.map((r: Rating, i: number) => (
          <RatingBar
            key={`overall-rating-${i}`}
            rating={r}
            delay={i}
            animated={true}
          />
        ))}
      </div>
      <div className="mb-4">
        <div className="fw-normal mb-2 small">{t('agent.popularTags')}</div>
        {agent.topTags.map((tag: Tag, i: number) => (
          <TagBadge
            label={t(tagsTranslationMap[tag.name])}
            className="me-2 mb-2 p-2"
            key={`agent-detail-tag-${i}`}
          />
        ))}
      </div>
      <hr style={{ borderTopWidth: '3px' }} />
      <h4 className="text-center mb-3">
        {t('agent.rating', { count: reviews.length })}
      </h4>
      <div className="vertical-rhythm">
        <AnimatedList>
          {reviews.map((r: Review) => (
            <ReviewCard
              showModerationModal={() => setShowModerationModal(true)}
              review={r}
              key={`agent-review-${r.id}`}
            />
          ))}
        </AnimatedList>
      </div>
      <RateAgentModal
        agent={agent}
        show={showRateAgentModal}
        close={closeModal}
        onSubmit={onSubmit}
      />
      <ConfirmationModal
        show={showConfirmToRateModal}
        onHide={() => setShowConfirmToRateModal(false)}
        title={t('confirmationModal.title')}
        bodyClass="px-4"
        user={user}
        closeButton
      />
      <ModerationInfoModal
        show={showModerationModal}
        onHide={() => setShowModerationModal(false)}
      />
    </>
  )
}
