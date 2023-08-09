import { useLoaderData } from "react-router-dom"
import Agent from "../types/Agent"

export default function AgentView() {
  const agent = useLoaderData() as Agent

  return <h1>{agent.id}</h1>
}
