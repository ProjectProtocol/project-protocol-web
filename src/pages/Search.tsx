import {
  Form,
  useLoaderData,
  useSubmit,
  Link,
  useNavigate,
} from 'react-router-dom'
import SearchResult from '../components/SearchResult'
import { useEffect } from 'react'
import debounce from 'lodash/debounce'
import { Card } from 'react-bootstrap'
import { SearchLoaderReturn } from '../loaders/searchLoader'
import SearchBar from 'src/components/SearchBar'
import Agent from 'src/types/Agent'
import Office from 'src/types/Office'

export default function Search() {
  const { searchData, searchParam } = useLoaderData() as SearchLoaderReturn
  const submit = useSubmit()
  const { data, meta } = searchData
  const navigate = useNavigate()

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
          aria-label="Search by agent or office"
          size="lg"
          placeholder="Search by agent or office"
          type="text"
          name="search"
          defaultValue={searchParam}
          onChange={handleInput}
          autoFocus
        />
      </Form>
      <p className="soft">
        {searchParam
          ? `Showing ${data?.length} of ${meta.total} results`
          : 'Most recent reviews'}
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
            <h3 className="mb-4">Can't find what you're looking for?</h3>
            <Link
              to="/agents/new"
              aria-label="Add an agent"
              className="w-75 text-white btn btn-lg btn-primary"
            >
              Add an agent
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
