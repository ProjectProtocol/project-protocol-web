import { useCallback, useEffect, useState } from 'react'
import { Card, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import OfficeInfo from 'src/components/OfficeInfo'
import RatingsBadge from 'src/components/RatingsBadge'
import { OfficeLoaderReturn } from 'src/loaders/officeLoader'
import Agent from 'src/types/Agent'
import businessIcon from 'src/images/business.svg'
import { ApiAgent } from 'src/api'
import Paginator from 'src/components/Paginator'
import { debounce } from 'lodash-es'
import SearchMeta from 'src/types/SearchMeta'

export default function OfficeView() {
  const { office } = useLoaderData() as OfficeLoaderReturn
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [agents, setAgents] = useState<Agent[]>([])
  const [meta, setMeta] = useState<SearchMeta>()

  const getAgents = useCallback(
    async (page: number) => {
      return await ApiAgent.list({
        officeId: office.id,
        search: searchValue,
        page,
      })
    },
    [office.id, searchValue],
  )

  useEffect(() => {
    const initializeAgents = async (page: number) => {
      const agentData = await getAgents(page)
      setAgents(agentData.data)
      setMeta(agentData.meta)
    }
    const handleSearchInput = debounce(initializeAgents, 500)

    handleSearchInput(0)
  }, [getAgents])

  return (
    <>
      <div className="mb-3">
        <a onClick={() => navigate(-1)} role="button">
          <i className="bi bi-chevron-left align-middle" />
          {t('ui.back')}
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
      <h3>{t('agent.agents')}</h3>
      <InputGroup className="my-3">
        <InputGroup.Text id="basic-addon1">🔎</InputGroup.Text>
        <FormControl
          type="text"
          value={searchValue}
          aria-describedby="basic-addon1"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={t('agent.searchByOffice')}
        />
      </InputGroup>
      {meta && (
        <Paginator<Agent>
          data={agents}
          meta={meta}
          getData={getAgents}
          keyGenerator={(r) => `office-agent-${r.id}`}
          ItemComponent={({ item }) => (
            <Card
              body
              className="mb-3 shadow-sm"
              as={Link}
              to={`/agents/${item.id}`}
            >
              <Row>
                <Col>
                  <div className="h-100 d-flex flex-column justify-content-center">
                    <h4 className="mb-0">
                      {item.lastName}, {item.firstName}
                    </h4>
                    <h5 className="text-dark">{t('agent.agent')}</h5>
                  </div>
                </Col>
                <Col className="text-end">
                  <RatingsBadge rating={item.averageRating} />
                </Col>
              </Row>
            </Card>
          )}
        />
      )}
    </>
  )
}
