import Office from './Office'
import { Tag } from './Tag'

type Agent = {
  firstName: string
  lastName: string
  fullName: string
  office: Office
  type: string
  id: string
  averageRating: number
  overallStats?: { [key: string]: number }
  topTags?: Tag[]
}

export interface AgentDetail extends Agent {
  overallStats: { [key: string]: number }
  topTags: Tag[]
}

export default Agent
