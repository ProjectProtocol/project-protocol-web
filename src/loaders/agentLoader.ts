import { LoaderFunctionArgs } from 'react-router-dom'
import { AgentDetail } from '../types/Agent'
import { Review } from '../types/Review'
import { ApiAgent, ApiReviews } from 'src/api'

export type AgentLoaderReturn = {
  agent: AgentDetail
  reviews: Review[]
}

export default async function agentLoader({
  params,
}: LoaderFunctionArgs): Promise<AgentLoaderReturn> {
  const agentId = params.agentId as string
  const [agent, reviews] = await Promise.all([
    ApiAgent.get(agentId),
    ApiReviews.list(agentId),
  ])

  return { agent, reviews }
}
