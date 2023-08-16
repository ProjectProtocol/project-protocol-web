import { LoaderFunctionArgs } from "react-router-dom"
import { getAgent, getAgentReviews } from "../api"
import { AgentDetail } from "../types/Agent"
import { Review } from "../types/Review"

export type AgentLoaderReturn = {
  agent: AgentDetail
  reviews: Review[]
}

export default async function agentLoader({
  params,
}: LoaderFunctionArgs): Promise<AgentLoaderReturn> {
  const agentId = params.agentId as string
  const [agent, reviews] = await Promise.all([
    getAgent(agentId),
    getAgentReviews(agentId),
  ])

  return { agent, reviews }
}
