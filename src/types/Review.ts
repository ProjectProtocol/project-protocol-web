import { Tag } from './Tag'

export const RatingCategories = [
  'Helpful',
  'Caring',
  'Respectful',
  'Availability',
] as const

export type RatingCategory = (typeof RatingCategories)[number]

export type Rating = {
  label: RatingCategory
  value: number
}

export type Review = {
  id: number
  isPublished: boolean
  isPending: boolean
  ratings: Rating[]
  reviewInput?: string
  overallRating: number
  tags: Tag[]
  type: 'Review'
}
