import { Card } from "react-bootstrap"
import Agent from "../types/Agent"

interface SearchResultI {
  result: Agent
}

// Needs a generic type
export default function SearchResult({ result }: SearchResultI) {
  return (
    <Card body className="mb-3">
      <h3>{result.fullName}</h3>
      <p>Average Rating: {result.averageRating}</p>
    </Card>
  )
}
