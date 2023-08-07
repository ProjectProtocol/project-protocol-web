import Agent from "../types/Agent"

interface SearchResultAgentI {
  agent: Agent
}

export default function SearchResultAgent({ agent }: SearchResultAgentI) {
  return (
    <>
      <h3>{agent.fullName}</h3>
      <p>Average Rating: {agent.averageRating}</p>
    </>
  )
}
