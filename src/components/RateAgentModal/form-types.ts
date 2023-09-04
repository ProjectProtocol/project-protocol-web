export type IRateAgentFormState = {
  helpful: number
  caring: number
  respectful: number
  availability: number
  tags: string[]
  review_input?: string
}

// Types for field configurations

type RatingFormField = {
  name: keyof IRateAgentFormState
  required: boolean
  type: string
}

export interface RatingFormInteger extends RatingFormField {
  type: 'integer'
  ui: {
    helperLeft: string
    helperRight: string
    title: string
    titleHelper: string
  }
}

export interface RatingFormString extends RatingFormField {
  type: 'string'
  ui: {
    title: string
    values: { [key: string]: string }
  }
}

export interface RatingFormText extends RatingFormField {
  type: 'text'
  ui: {
    placeholder: string
    title: string
  }
}
