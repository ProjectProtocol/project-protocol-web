import { useState } from 'react'
import { Card, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { Link, useLoaderData } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import OfficeInfo from 'src/components/OfficeInfo'
import RatingsBadge from 'src/components/RatingsBadge'
import { OfficeLoaderReturn } from 'src/loaders/officeLoader'
import businessIcon from 'src/images/business.svg'
import { ApiAgent } from 'src/api'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import AnimatedList from 'src/components/AnimatedList'
import { InView } from 'react-intersection-observer'
import { debounce } from 'lodash-es'
import PageHeader from 'src/components/PageHeader'

export default function OfficeView() {
  const { office } = useLoaderData() as OfficeLoaderReturn
  const [searchValue, setSearchValue] = useState('')
  const { t } = useTranslation()

  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery({
      queryKey: ['officeAgents', searchValue, office.id],
      queryFn: async ({ pageParam = 0 }) =>
        await ApiAgent.list({
          officeId: office.id,
          search: searchValue,
          page: pageParam as number,
        }),
      getNextPageParam: ({ meta }) =>
        meta.page < meta.totalPages - 1 ? meta.page + 1 : undefined,
      initialPageParam: 0,
      staleTime: 1000 * 60 * 5,
    })

  const meta = data?.pages[0].meta

  const handleInput = debounce((event) => {
    setSearchValue(event.target.value)
  }, 500)

  return (
    <div className="vertical-rhythm">
      <PageHeader title="" showBack />
      <Row>
        <Col>
          <OfficeInfo office={office} large />
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
          aria-describedby="basic-addon1"
          onChange={handleInput}
          placeholder={t('agent.searchByOffice')}
        />
      </InputGroup>
      {meta &&
        (meta.total === 0 ? (
          <p className="text-center">No matching agents.</p>
        ) : (
          data.pages.map((p, i) => {
            const lastPage = i === data.pages.length - 1
            return (
              <AnimatedList
                key={`office-agent-page-${i}-${p.data[0]?.id}`}
                immediate={!lastPage}
                delay={75}
              >
                {p.data.map((item) => (
                  <Card
                    key={`office-agent-${item.id}`}
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
                ))}
              </AnimatedList>
            )
          })
        ))}
      <InView
        as="div"
        data-testid="observer-target"
        onChange={(inView) =>
          inView && hasNextPage && !isFetching && fetchNextPage()
        }
      />
    </div>
  )
}
