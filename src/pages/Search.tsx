import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import Agent from '../types/Agent'
import SearchResult from '../components/SearchResult'
import { useEffect } from 'react'
import { debounce } from 'lodash'
import { Button, Card } from 'react-bootstrap'
import { SearchLoaderReturn } from '../loaders/searchLoader'
import SearchBar from 'src/components/SearchBar'

export default function Search() {
  const { searchData, searchParam } = useLoaderData() as SearchLoaderReturn
  const submit = useSubmit()
  const { data, meta } = searchData

  useEffect(() => {
    const searchEl = document.getElementById('search') as HTMLInputElement
    searchEl.value = searchParam as string
  }, [searchParam])

  const handleInput = debounce((event) => {
    submit(event.target.form, { replace: true })
  }, 500)

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
        />
      </Form>
      <p className="soft">
        {searchParam
          ? `Showing ${data?.length} of ${meta.total} results`
          : 'Most recent reviews'}
      </p>
      <div>
        {data &&
          data.map((r) => <SearchResult result={r as Agent} key={r.id} />)}
        <Card border="0" className="text-center mb-3">
          <Card.Body className="p-4">
            <h3 className="mb-4">Can't find what you're looking for?</h3>
            <Button
              aria-label="Add an agent"
              variant="primary"
              size="lg"
              className="w-75 text-white"
            >
              Add an agent
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
