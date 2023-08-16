import { Rating, Tag } from "./agentLoader"

type Review = {
  id: number
  ratings: Rating[]
  reviewInput: string
  overallRating: number
  tags: Tag[]
  type: "Review"
}
