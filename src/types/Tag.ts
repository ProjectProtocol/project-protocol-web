export type TagTranslation = { [lang: string]: string }

export type Tag = {
  name: string
  translations: TagTranslation
  type: 'Tag'
}
