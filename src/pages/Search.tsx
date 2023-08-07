import { useLoaderData } from "react-router-dom"

import { SearchData } from "../api/search"
import Agent from "../types/Agent"
import SearchResult from "../components/SearchResult"

export default function Search() {
  const { results, meta }: SearchData = useLoaderData()

  return (
    <div>
      <h1>Search</h1>
      <p className="soft">
        Showing {results?.length} of {meta.total} results
      </p>
      {results &&
        results.map((r) => <SearchResult result={r as Agent} key={r.id} />)}
    </div>
  )
}
