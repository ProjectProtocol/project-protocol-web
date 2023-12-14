import {
  Link,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'
import AgentInfo from '../components/AgentInfo'
import { AgentLoaderReturn } from '../loaders/agentLoader'
import { Rating, Review } from '../types/Review'
import ReviewCard from '../components/ReviewCard'
import { useState } from 'react'
import RateAgentModal from '../components/RateAgentModal'
import RatingBar from '../components/RatingBar'
import { IRateAgentFormState } from 'src/components/RateAgentModal/form-types'
import { ApiConfirmations, ApiReviews } from 'src/api'
import toast from 'react-hot-toast'
import { useAuth } from 'src/contexts/auth/AuthContext'
import { Tag, tagsTranslationMap } from 'src/types/Tag'
import TagBadge from 'src/components/TagBadge'
import { useTranslation } from 'react-i18next'
import PopUp from 'src/components/PopUp'
import { useLogin } from 'src/contexts/LoginUIProvider/LoginUIContext'
import { LOGIN_PAGES } from 'src/components/LoginModal/constants'

export default function AgentView() {
  const { agent, reviews } = useLoaderData() as AgentLoaderReturn
  const { user } = useAuth()
  const { openLogin } = useLogin()
  const [showModal, setShowModal] = useState(false)
  const [resentCodeAt, setResentCodeAt] = useState<Date>()
  const [showConfirmToRateModal, setShowConfirmToRateModal] = useState(false)
  const navigate = useNavigate()
  const { revalidate } = useRevalidator()
  const { t } = useTranslation()

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

  const rateButtonOnClick = () => {
    if (user) {
      if (user.isConfirmed) {
        setShowModal(true)
      } else {
        setShowConfirmToRateModal(true)
      }
    } else {
      openLogin(LOGIN_PAGES.SIGN_UP)
    }
  }

  const requestConfirmationCode = async () => {
    const success = await ApiConfirmations.resend()
    if (success) {
      setResentCodeAt(new Date())
    } else {
      toast.error(t('error.generic'))
    }
  }

  return (
    <>
      <a role="button" onClick={() => navigate(-1)}>
        <i className="bi bi-chevron-left align-middle" />
        Back
      </a>
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
          <Button className="w-100" onClick={rateButtonOnClick}>
            {user ? 'Rate agent' : 'Sign up to rate'}
          </Button>
          {!user && (
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => openLogin(LOGIN_PAGES.SIGN_IN)}
              >
                or log in
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <div className="mb-4">
        <div className="fw-normal mb-2 small">Overall Ratings</div>
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
        <div className="fw-normal mb-2 small">Popular Tags</div>
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
      {reviews.map((r: Review) => (
        <ReviewCard review={r} key={`agent-review-${r.id}`} />
      ))}
      <RateAgentModal
        agent={agent}
        show={showModal}
        close={closeModal}
        onSubmit={onSubmit}
      />

      <PopUp
        show={showConfirmToRateModal}
        onHide={() => setShowConfirmToRateModal(false)}
        title="Confirm your account to rate agents"
        bodyClass="px-4"
        closeButton
      >
        {user && (
          <>
            <p>
              We previously sent an email to <strong>{user.email}</strong> to
              confirm this email belongs to you. Tap on the button in the email
              to finish signing up.
            </p>

            {resentCodeAt ? (
              <p>
                <i className="bi bi-check-circle me-1 align-middle text-success" />
                Confirmation email sent
              </p>
            ) : (
              <p>
                If you did not receive an email,{' '}
                <a
                  role="button"
                  className="link"
                  onClick={requestConfirmationCode}
                >
                  click here to resend
                </a>
                .
              </p>
            )}
            <div className="text-center mt-5">
              <Link to="/terms-of-service">Terms of use</Link>
            </div>
          </>
        )}
      </PopUp>
    </>
  )
}
