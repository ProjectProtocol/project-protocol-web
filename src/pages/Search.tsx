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
    submit(event.target.form, { replace: true })
  }, 500)

  return (
    <div>
      <Form id="search-form" role="search" className="mb-3 position-relative">
        <FormControl
          id="search"
          aria-label="Search by agent or office"
          size="lg"
          placeholder="Search by agent or office"
          autoComplete="false"
          className="rounded-5 border border-primary border-3 text-primary fw-bold"
          type="text"
          name="search"
          defaultValue={searchParam}
          onChange={handleInput}
        />
      </Form>
      <p className="soft">
        {searchParam
          ? `Showing ${data?.length} of ${meta.total} results`
          : "Most recent reviews"}
      </p>
      {data && data.map((r) => <SearchResult result={r as Agent} key={r.id} />)}
    </div>
  )
}
