import { Form, useLoaderData, useSubmit } from "react-router-dom"
import Agent from "../types/Agent"
import SearchResult from "../components/SearchResult"
import { useEffect } from "react"
import { debounce } from "lodash"
import { FormControl } from "react-bootstrap"
import { SearchLoaderReturn } from "../loaders/searchLoader"

export default function Search() {
  const { searchData, searchParam } = useLoaderData() as SearchLoaderReturn
  const submit = useSubmit()
  const { data, meta } = searchData

  useEffect(() => {
    const searchEl = document.getElementById("search") as HTMLInputElement
    searchEl.value = searchParam as string
  }, [searchParam])

  const handleInput = debounce((event) => {
    submit(event.target.form)
  }, 500)

  return (
    <div>
      <h1>Search</h1>
      <Form id="search-form" role="search" className="mb-3 position-relative">
        <FormControl
          id="search"
          aria-label="Search agents and offices"
          size="lg"
          placeholder="Search agents and offices"
          type="text"
          name="search"
          defaultValue={searchParam}
          onChange={handleInput}
        />
      </Form>
      <p className="soft">
        Showing {data?.length} of {meta.total} results
      </p>
      {data && data.map((r) => <SearchResult result={r as Agent} key={r.id} />)}
    </div>
  )
}
