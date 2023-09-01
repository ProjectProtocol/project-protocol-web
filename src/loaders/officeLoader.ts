import { LoaderFunctionArgs } from 'react-router-dom'
import { ApiAgent, ApiOffice } from 'src/api'
import Agent from 'src/types/Agent'
import Office from 'src/types/Office'

export type OfficeLoaderReturn = {
  office: Office
  agents: Agent[]
}

export default async function officeLoader({
  params,
}: LoaderFunctionArgs): Promise<OfficeLoaderReturn> {
  const officeId = params.officeId as string
  const [office, agents] = await Promise.all([
    ApiOffice.get(officeId),
    ApiAgent.list(officeId),
  ])

  return {
    office,
    agents,
  }
}
