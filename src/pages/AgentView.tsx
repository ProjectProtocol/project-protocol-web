import { useLoaderData, useNavigate } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"
import AgentInfo from "../components/AgentInfo"
import { AgentLoaderReturn } from "../loaders/agentLoader"
import { Rating, Review } from "../types/Review"
import ReviewCard from "../components/ReviewCard"
import { useState } from "react"
import RateAgentModal from "../components/RateAgentModal"
import RatingBar from "../components/RatingBar"

export default function AgentView() {
  const { agent, reviews } = useLoaderData() as AgentLoaderReturn
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const overallRatings: Rating[] = Object.entries(agent.overallStats).map(
    (e) => {
      const [label, value] = e
      return { label, value }
    }
  )

  return (
    <>
      <a role="button" onClick={() => navigate(-1)}>
        <i className="bi bi-chevron-left align-middle" />
        Back
      </a>
      <h1 className="text-info mt-3">Agent: {agent.fullName}</h1>
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
              style={{ marginLeft: 2, position: "relative", top: -10 }}
            >
              /5
            </span>
          </div>
          <Button className="w-100" onClick={() => setShowModal(true)}>
            Rate
          </Button>
        </Col>
      </Row>
      <span className="fs-6 d-block">Overall Ratings</span>
      {overallRatings.map((r: Rating, i: number) => (
        <RatingBar
          key={`overall-rating-${i}`}
          rating={r}
          delay={i}
          animated={true}
        />
      ))}
      <hr style={{ borderTopWidth: "2px" }} />
      <h4 className="text-center mb-3">{reviews.length} Ratings</h4>
      {reviews.map((r: Review) => (
        <ReviewCard review={r} key={`agent-review-${r.id}`} />
      ))}
      <RateAgentModal
        agent={agent}
        show={showModal}
        close={() => setShowModal(false)}
      />
    </>
  )
}
