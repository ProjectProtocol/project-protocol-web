import { useLoaderData } from "react-router-dom"
import Agent from "../types/Agent"
import { Button, Col, Row } from "react-bootstrap"
import AgentInfo from "../components/AgentInfo"

export default function AgentView() {
  const agent = useLoaderData() as Agent

  return (
    <Row>
      <Col>
        <AgentInfo agent={agent} />
      </Col>
      <Col
        xs="auto"
        style={{ minWidth: 100 }}
        className="d-flex align-items-center flex-column p-0"
      >
        <div className="position-relative mb-3 text-center">
          <h4 className="mb-0">Rating</h4>
          <span className="h2 fw-bold m-0">{agent.averageRating}</span>
          <span style={{ marginLeft: 3, position: "relative", top: -10 }}>
            /5
          </span>
        </div>
        <Button className="w-100">Rate</Button>
      </Col>
    </Row>
  )
}
