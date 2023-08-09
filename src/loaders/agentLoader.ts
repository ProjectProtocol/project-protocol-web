import { LoaderFunctionArgs } from "react-router-dom"
import { getAgent } from "../api"
import Agent from "../types/Agent"

export default async function agentLoader({
  params,
}: LoaderFunctionArgs): Promise<Agent> {
  const { agent } = await getAgent(params.agentId as string)
  return agent
}
