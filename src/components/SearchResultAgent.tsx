import { Col, Row } from "react-bootstrap"
import Agent from "../types/Agent"
import RatingsBadge from "./RatingsBadge"

interface SearchResultAgentI {
  agent: Agent
}

export default function SearchResultAgent({ agent }: SearchResultAgentI) {
  return (
    <>
      <Row>
        <Col>
          <h4 className="m-0">
            {agent.lastName}, {agent.firstName}
          </h4>
          <h4 className="m-0 text-secondary large">Agent</h4>
        </Col>
        <Col xs="auto">
          <RatingsBadge rating={agent.averageRating} />
        </Col>
      </Row>
      <p className="m-0">{agent.office.street}</p>
      <p className="m-0">
        {agent.office.city}, {agent.office.state} {agent.office.zip}
      </p>
    </>
  )
}
