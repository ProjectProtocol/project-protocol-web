import Office from './Office'

type Agent = {
  firstName: string
  lastName: string
  fullName: string
  office: Office
  type: string
  id: number
  averageRating: number
  overallStats?: { [key: string]: number }
}

export interface AgentDetail extends Agent {
  overallStats: { [key: string]: number }
}

export default Agent
