import { Tag } from './Tag'

export type Rating = {
  label: string
  value: number
}

export type Review = {
  id: number
  ratings: Rating[]
  reviewInput: string
  overallRating: number
  tags: Tag[]
  type: 'Review'
}
