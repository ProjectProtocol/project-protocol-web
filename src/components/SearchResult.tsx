import { Card } from "react-bootstrap"
import Agent from "../types/Agent"
import { useNavigate } from "react-router-dom"
import Office from "../types/Office"
import SearchResultAgent from "./SearchResultAgent"
import SearchResultOffice from "./SearchResultOffice"
import { useState } from "react"
import classNames from "classnames"

interface SearchResultI {
  result: Agent | Office
}

// Needs a generic type
export default function SearchResult({ result }: SearchResultI) {
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)

  const details =
    result.type === "Agent" ? (
      <SearchResultAgent agent={result as Agent} />
    ) : (
      <SearchResultOffice office={result as Office} />
    )
  return (
    <Card
      body
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classNames("mb-4 pe-auto", { "shadow": hover, "shadow-sm": !hover })}
      style={{ transition: 'box-shadow 0.5s' }}
      role="button"
      onClick={() => navigate(`/agents/${result.id}`)}
    >
      {details}
    </Card>
  )
}
