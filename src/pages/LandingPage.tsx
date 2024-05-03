import { useQuery, useQueryClient } from '@tanstack/react-query'
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
import losAngeles from 'src/images/cedric-letsch-UZVlSjrIJ3o-unsplash.jpg'
import useWindowSize from 'src/hooks/useWindowSize'
import { updateQueryItem } from 'src/util/mutationUpdate'
import PageHeader from 'src/components/PageHeader'
import { useTranslate } from '@tolgee/react'

export default function LandingPage() {
  const { t } = useTranslate(['home', 'shared'])
  const queryClient = useQueryClient()
  const { data: resourceData } = useQuery<SearchData<Resource>>({
    queryKey: ['landingPageResources'],
    queryFn: async () => await ApiResources.list({}),
  })

  const [width] = useWindowSize()

  const smallScreen = width < 768

  function updateResource({ resource }: { resource: Resource }) {
    queryClient.setQueryData(
      ['landingPageResources'],
      updateQueryItem(resource),
    )
  }

  return (
    <div className="vertical-rhythm">
      <PageHeader title={t('title')} showBack={false} />
      <Row className="g-3">
        <Col xs={12}>
          <div
            className="w-100 position-relative rounded justify-content-end align-items-end  d-flex flex-column"
            style={{
              height: smallScreen ? '240px' : '300px',
              width: '100%',
              background: `url(${losAngeles}) no-repeat center center`,
              backgroundSize: 'cover',
            }}
          >
            <Card
              body
              className="w-100 text-start text-lg-end rounded-top-0"
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(3px)',
              }}
            >
              <h4 className="text-white">{t('welcomeTitle')}</h4>
              <p className="text-white m-0">
                {t('welcomeMessage')}
                <br />
                <Link to="/about" className="text-white small text-nowrap">
                  {t('learnMore', { ns: 'shared' })}
                  <i className="bi bi-arrow-right ms-1 align-middle"></i>
                </Link>
              </p>
            </Card>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <LandingPageCard
            href="/resources"
            title={t('resourcesTitle')}
            description={t('resourcesDescription')}
            cardClass="bg-light-cobalt"
            icon={<ResourcesIcon />}
          />
        </Col>
        <Col xs={6} md={4} style={{ minWidth: '150px' }}>
          <LandingPageCard
            href="/rate-my-po"
            title={t('rateMyPoTitle')}
            description={t('rateMyPoDescription')}
            cardClass="bg-loquat"
            icon={<SearchIcon />}
          />
        </Col>
        <Col xs={6} md={4} style={{ minWidth: '150px' }}>
          <LandingPageCard
            href="/vote"
            title={t('voteTitle')}
            description={t('voteDescription')}
            cardClass="bg-secondary"
            icon={<VoteIcon />}
          />
        </Col>
        <Col xs={12}>
          <div className="d-flex flex-row justify-content-between mt-3 align-items-center">
            <h3 className="m-0">{t('recentResources')}</h3>
            <div>
              <Link to="/resources">{t('moreResources')}</Link>
              <i className="bi bi-chevron-right ms-2 align-middle"></i>
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <div className="d-flex flex-column gap-3">
            {resourceData?.data
              .slice(0, 3)
              .map((resource: Resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onUpdate={updateResource}
                />
              ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}
