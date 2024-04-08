import { useQuery } from '@tanstack/react-query'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ApiResources } from 'src/api'
import SearchIcon from 'src/components/svg/SearchIcon'
import VoteIcon from 'src/components/svg/VoteIcon'
import ResourceCard from 'src/components/Resources/ResourceCard'
import Resource from 'src/types/Resource'
import { SearchData } from 'src/types/SearchData'
import ResourcesIcon from 'src/components/svg/ResourcesIcon'
import LandingPageCard from 'src/components/LandingPage/LandingPageCard'

export default function LandingPage() {
  const { data: resourceData } = useQuery<SearchData<Resource>>({
    queryKey: ['landingPageResources'],
    queryFn: async () => await ApiResources.list({}),
  })

  return (
    <Row className="g-3">
      <Col xs={12}>
        <LandingPageCard
          href="/resources"
          title="Resources"
          description="This page is a collection of resources that you may find useful."
          cardClass="bg-light-cobalt"
          icon={<ResourcesIcon />}
        />
      </Col>
      <Col xs={12}>
        <Row>
          <Col xs={6} className="h-100" style={{ minWidth: '150px' }}>
            <LandingPageCard
              href="/rate-my-po"
              title="Rate your PO"
              description="Anonymously share your parole experience"
              cardClass="bg-loquat"
              icon={<SearchIcon />}
            />
          </Col>
          <Col xs={6} className="h-100" style={{ minWidth: '150px' }}>
            <LandingPageCard
              href="/vote"
              title="Register to vote"
              description="You have the right to vote for your rights."
              cardClass="bg-secondary"
              icon={<VoteIcon />}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <Card body className="bg-medium-gray home-card-gradient shadow">
          <h4 className="m-0">
            <i className="bi bi-youtube align-middle me-2"></i>
            Learn how to rate your PO
          </h4>
        </Card>
      </Col>
      <Col xs={12}>
        <div className="d-flex flex-row justify-content-between mt-3 align-items-center">
          <h3 className="m-0">Recent Resources</h3>
          <div>
            <Link to="/resources">More resources</Link>
            <i className="bi bi-chevron-right ms-2 align-middle"></i>
          </div>
        </div>
      </Col>
      <Col xs={12}>
        <div className="d-flex flex-column gap-3">
          {resourceData?.data
            .slice(0, 3)
            .map((resource: Resource, i: number) => (
              <ResourceCard
                index={i}
                queryKey={['landingPageResources']}
                key={resource.id}
                resource={resource}
              />
            ))}
        </div>
      </Col>
    </Row>
  )
}
