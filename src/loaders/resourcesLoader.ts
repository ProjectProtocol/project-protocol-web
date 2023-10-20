import { EntryCollection } from 'contentful'
import { defer } from 'react-router-dom'
import { ResourceLinkSkeleton } from 'src/types/contentful-types'
import ContentfulClient from 'src/util/ContentfulClient'

export type ResourcesLoaderReturn = {
  resourceCollection: Promise<EntryCollection<ResourceLinkSkeleton>>
}
export default async function () {
  const data = ContentfulClient.getEntries<ResourceLinkSkeleton>({
    content_type: 'resourceLink',
  })

  return defer({
    resourceCollection: data,
  })
}
