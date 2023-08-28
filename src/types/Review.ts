export type Rating = {
  label: string
  value: number
}

export type TagTranslation = { [lang: string]: string }

export type Tag = {
  name: string
  translations: TagTranslation
  type: 'Tag'
}

export type Review = {
  id: number
  ratings: Rating[]
  reviewInput: string
  overallRating: number
  tags: Tag[]
  type: 'Review'
}
