import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface DocumentFields {
  title: EntryFieldTypes.Symbol
  body?: EntryFieldTypes.RichText
}

export type DocumentSkeleton = EntrySkeletonType<DocumentFields, 'document'>
export type Document<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<DocumentSkeleton, Modifiers, Locales>

export const resourceCategories = [
  'Articles',
  'Education services',
  'Housing services',
  'Legal services',
  'Mental health services',
  'Resource databases',
  'Service providers',
  'Suggest a resource',
  'Supportive services',
] as const

export type ResourceCategoryType = (typeof resourceCategories)[number]

export interface ResourceLinkFields {
  title: EntryFieldTypes.Symbol
  category: EntryFieldTypes.Array<EntryFieldTypes.Symbol<ResourceCategoryType>>
  location?: EntryFieldTypes.Symbol
  url: EntryFieldTypes.Text
  contactInfo1?: EntryFieldTypes.Symbol
  contactInfo2?: EntryFieldTypes.Symbol
  organization?: EntryFieldTypes.Symbol
  image?: EntryFieldTypes.AssetLink
}

export type ResourceLinkSkeleton = EntrySkeletonType<
  ResourceLinkFields,
  'resourceLink'
>

export type ResourceLink<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<ResourceLinkSkeleton, Modifiers, Locales>
