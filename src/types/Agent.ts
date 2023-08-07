import Office from "./Office"

type Agent = {
  firstName: string
  lastName: string
  fullName: string
  office: Office
  type: string
  id: number
  averageRating: number
}

export default Agent
