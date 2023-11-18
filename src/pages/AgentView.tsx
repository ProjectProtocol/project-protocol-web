import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'
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
import { Tag } from 'src/types/Tag'
import TagBadge from 'src/components/TagBadge'
import { useTranslation } from 'react-i18next'

export default function AgentView() {
  const { agent, reviews } = useLoaderData() as AgentLoaderReturn
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const { revalidate } = useRevalidator()
  const { t } = useTranslation()

  const overallRatings: Rating[] = Object.entries(agent.overallStats).map(
    (e) => {
      const [label, value] = e
      return { label, value }
    },
  )

  const closeModal = (refreshAgent = false) => {
    if (refreshAgent) {
      revalidate()
    }
    setShowModal(false)
  }

  const onSubmit = async (data: IRateAgentFormState) => {
    const reviewSuccess = await ApiReviews.create(agent.id, data)
    if (reviewSuccess) {
      toast.success('Review created successfully')
      closeModal(true)
    } else {
      toast.error('Something went wrong, please try again')
      closeModal()
    }
  }

  return (
    <>
      <a role="button" onClick={() => navigate(-1)}>
        <i className="bi bi-chevron-left align-middle" />
        Back
      </a>
      <h1 className="text-secondary mt-3">
        {t('agent.heading', { fullName: agent.fullName })}
      </h1>
      <Row className="mb-3">
        <Col xs={12} className="mb-3"></Col>
        <Col>
          <AgentInfo agent={agent} />
        </Col>
        <Col xs="auto" style={{ minWidth: 100 }}>
          <div className="position-relative mb-3 text-center">
            <h4 className="mb-0">Rating</h4>
            <span className="h2 fw-bold m-0">{agent.averageRating}</span>
            <span
              className="fw-bold"
              style={{ marginLeft: 2, position: 'relative', top: -10 }}
            >
              /5
            </span>
          </div>
          <Button
            className="w-100"
            variant="secondary"
            onClick={() => {
              user && user.isConfirmed
                ? setShowModal(true)
                : toast('Please confirm your account to rate parole agents', {
                    icon: (
                      <i className="bi bi-exclamation-triangle-fill text-warning"></i>
                    ),
                  })
            }}
          >
            Rate
          </Button>
        </Col>
      </Row>
      <div className="mb-4">
        <div className="fw-normal mb-2 small">Overall Ratings</div>
        {overallRatings.map((r: Rating, i: number) => (
          <RatingBar
            key={`overall-rating-${i}`}
            rating={r}
            delay={i}
            animated={true}
          />
        ))}
      </div>
      <div className="mb-4">
        <div className="fw-normal mb-2 small">Popular Tags</div>
        {agent.topTags.map((t: Tag, i: number) => (
          <TagBadge
            label={t.translations['en']}
            className="me-2 mb-2 p-2"
            key={`agent-detail-tag-${i}`}
          />
        ))}
      </div>
      <hr style={{ borderTopWidth: '3px' }} />
      <h4 className="text-center mb-3">
        {t('agent.rating', { count: reviews.length })}
      </h4>
      {reviews.map((r: Review) => (
        <ReviewCard review={r} key={`agent-review-${r.id}`} />
      ))}
      <RateAgentModal
        agent={agent}
        show={showModal}
        close={closeModal}
        onSubmit={onSubmit}
      />
    </>
  )
}
