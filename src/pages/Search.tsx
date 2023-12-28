import {
  Form,
  useLoaderData,
  useSubmit,
  Link,
  useNavigate,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SearchResult from '../components/SearchResult'
import { useEffect } from 'react'
import debounce from 'lodash/debounce'
import { Card } from 'react-bootstrap'
import { SearchLoaderReturn } from '../loaders/searchLoader'
import SearchBar from 'src/components/SearchBar'
import Agent from 'src/types/Agent'
import Office from 'src/types/Office'

export default function Search() {
  const {
    searchData: { data, meta },
    searchParam,
  } = useLoaderData() as SearchLoaderReturn
  const submit = useSubmit()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const searchEl = document.getElementById('search') as HTMLInputElement
    searchEl.value = searchParam as string
  }, [searchParam])

  const handleInput = debounce((event) => {
    submit(event.target.form, { replace: true })
  }, 500)

  const handleResultClick = (r: Agent | Office) => {
    const resultType = r.type
    const targetUrl = `/${resultType.toLowerCase()}s/${r.id}`
    return () => navigate(targetUrl, { state: { [resultType]: r } })
  }

  return (
    <div>
      <Form id="search-form" role="search" className="mb-3 position-relative">
        <SearchBar
          id="search"
          aria-label={t('search.placeholder')}
          size="lg"
          placeholder={t('search.placeholder')}
          name="search"
          onClear={() => navigate('/', { replace: true })}
          defaultValue={searchParam}
          onChange={handleInput}
          autoFocus
        />
      </Form>
      <p className="soft">
        {searchParam
          ? t('search.resultsDisplayed', {
              count: data?.length,
              total: meta.total,
            })
          : t('search.mostRecent')}
      </p>
      <div className="vertical-rhythm">
        {data &&
          data.map((r: Agent | Office) => (
            <SearchResult
              result={r}
              key={`search-result-${r.id}-${r.type}`}
              onClick={handleResultClick(r)}
            />
          ))}
        <Card border="0" className="text-center mb-3">
          <Card.Body className="p-4">
            <h3 className="mb-4">{t('search.noResults')}</h3>
            <Link
              to="/agents/new"
              aria-label={t('search.addAnAgent')}
              className="w-75 btn btn-lg btn-primary"
            >
              {t('search.addAnAgent')}
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
