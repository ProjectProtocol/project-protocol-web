import { useLoaderData } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"
import AgentInfo from "../components/AgentInfo"
import { AgentLoaderReturn } from "../loaders/agentLoader"
import { Review } from "../types/Review"
import ReviewCard from "../components/ReviewCard"

export default function AgentView() {
  const { agent, reviews } = useLoaderData() as AgentLoaderReturn

  return (
    <>
      <Row className="mb-3">
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
          <Button className="w-100">Rate</Button>
        </Col>
      </Row>
      <hr style={{ borderTopWidth: "2px" }} />
      <h4 className="text-center mb-3">{reviews.length} Ratings</h4>
      {reviews.map((r: Review) => (
        <ReviewCard review={r} key={`agent-review-${r.id}`} />
      ))}
    </>
  )
}
