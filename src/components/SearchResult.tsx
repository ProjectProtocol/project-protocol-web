import { Card } from "react-bootstrap"
import Agent from "../types/Agent"
import { useNavigate } from "react-router-dom"
import Office from "../types/Office"
import SearchResultAgent from "./SearchResultAgent"
import SearchResultOffice from "./SearchResultOffice"

interface SearchResultI {
  result: Agent | Office
}

// Needs a generic type
export default function SearchResult({ result }: SearchResultI) {
  const navigate = useNavigate()

  const details =
    result.type === "Agent" ? (
      <SearchResultAgent agent={result as Agent} />
    ) : (
      <SearchResultOffice office={result as Office} />
    )
  return (
    <Card
      body
      className="mb-3 shadow-sm"
      onClick={() => navigate(`/agents/${result.id}`)}
    >
      {details}
    </Card>
  )
}
