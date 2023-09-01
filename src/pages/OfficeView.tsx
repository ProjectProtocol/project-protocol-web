import { useMemo, useState } from 'react'
import { Card, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import OfficeInfo from 'src/components/OfficeInfo'
import RatingsBadge from 'src/components/RatingsBadge'
import { OfficeLoaderReturn } from 'src/loaders/officeLoader'
import Agent from 'src/types/Agent'
import businessIcon from 'src/images/business.svg'
import fuzzySearch from 'src/util/fuzzySearch'

export default function OfficeView() {
  const { office, agents } = useLoaderData() as OfficeLoaderReturn
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const filteredAgents = useMemo<Agent[]>(
    () =>
      agents.filter(({ fullName }: Agent) =>
        fuzzySearch(fullName, searchValue),
      ),
    [agents, searchValue],
  )

  return (
    <>
      <div className="mb-3">
        <a onClick={() => navigate(-1)} role="button">
          <i className="bi bi-chevron-left align-middle" />
          Back
        </a>
      </div>
      <Row>
        <Col>
          <OfficeInfo office={office} />
        </Col>
        <Col>
          <div className="h-100 d-flex flex-row justify-content-end align-items-center px-3">
            <img src={businessIcon} width="50" />
          </div>
        </Col>
      </Row>
      <hr />
      <h3>Agents</h3>
      <InputGroup className="my-3">
        <InputGroup.Text id="basic-addon1">🔎</InputGroup.Text>
        <FormControl
          type="text"
          value={searchValue}
          aria-describedby="basic-addon1"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search agents for this office"
        />
      </InputGroup>
      {filteredAgents.map((a: Agent, i: number) => (
        <Card
          key={`office-agent-${i}`}
          body
          className="mb-3 shadow-sm"
          as={Link}
          to={`/agents/${a.id}`}
        >
          <Row>
            <Col>
              <div className="h-100 d-flex flex-column justify-content-center">
                <h4 className="mb-0">
                  {a.lastName}, {a.firstName}
                </h4>
                <h5 className="text-secondary">Agent</h5>
              </div>
            </Col>
            <Col className="text-end">
              <RatingsBadge rating={a.averageRating} />
            </Col>
          </Row>
        </Card>
      ))}
    </>
  )
}
