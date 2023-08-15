import { Col, Row } from "react-bootstrap"
import Agent from "../types/Agent"

interface SearchResultAgentI {
  agent: Agent
}

export default function SearchResultAgent({ agent }: SearchResultAgentI) {
  return (
    <Row>
      <Col xs={8}>
        <h4 className="m-0">
          {agent.lastName}, {agent.firstName}
        </h4>
        <h4 className="m-0 text-secondary large">Agent</h4>
        <p className="m-0">{agent.office.street}</p>
        <p className="m-0">
          {agent.office.city}, {agent.office.state} {agent.office.zip}
        </p>
      </Col>
      <Col>
        <h4 className="text-end">{agent.averageRating}</h4>
      </Col>
    </Row>
  )
}
