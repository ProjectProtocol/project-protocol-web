import { useQuery } from '@tanstack/react-query'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ApiResources } from 'src/api'
import ResourceCard from 'src/components/Resources/ResourceCard'
import Resource from 'src/types/Resource'
import { SearchData } from 'src/types/SearchData'

export default function LandingPage() {
  const { data: resourceData } = useQuery<SearchData<Resource>>({
    queryKey: ['landingPageResources'],
    queryFn: async () => await ApiResources.list({}),
  })

  return (
    <Row className="g-3">
      <Col xs={12}>
        <Link to="/resources" className="text-decoration-none">
          <Card body className="bg-light-cobalt home-card-gradient shadow">
            <h3>Resources</h3>
            <p>
              This page is a collection of resources that you may find useful.
            </p>
          </Card>
        </Link>
      </Col>
      <Col xs={12}>
        <Row>
          <Col xs={6} className="h-100" style={{ minWidth: '150px' }}>
            <Link to="/rate-my-po" className="text-decoration-none">
              <Card body className="bg-loquat home-card-gradient shadow">
                <h4>Rate your PO</h4>
                <p>Anonymously share your parole experience</p>
              </Card>
            </Link>
          </Col>
          <Col xs={6} className="h-100" style={{ minWidth: '150px' }}>
            <Link to="/vote" className="text-decoration-none">
              <Card body className="bg-secondary home-card-gradient shadow">
                <h4>Register to vote</h4>
                <p>You have the right to vote for your rights.</p>
              </Card>
            </Link>
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
            <Link to="/resources">
              <small>More resources</small>
            </Link>
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
