import { EntryCollection } from 'contentful'
import { LoaderFunctionArgs, defer } from 'react-router-dom'
import {
  ResourceCategory,
  ResourceLinkSkeleton,
} from 'src/types/contentful-types'
import ContentfulClient from 'src/util/ContentfulClient'

export type ResourcesLoaderReturn = {
  resourceCollection: Promise<EntryCollection<ResourceLinkSkeleton>>
  categoryParam: ResourceCategory[]
}

export default async function ({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const categoryParam = url.searchParams.getAll('category')
  const cParam =
    categoryParam.length > 0 ? { 'fields.category[in]': categoryParam } : {}
  const data = ContentfulClient.getEntries<ResourceLinkSkeleton>({
    content_type: 'resourceLink',
    ...cParam,
  })

  return defer({
    resourceCollection: data,
    categoryParam,
  })
}
