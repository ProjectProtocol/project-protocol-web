import { EntryCollection } from 'contentful'
import { ResourceLinkEntrySkeleton } from 'src/types/ResourceLink'
import ContentfulClient from 'src/util/ContentfulClient'

export default async function (): Promise<
  EntryCollection<ResourceLinkEntrySkeleton>
> {
  const data = await ContentfulClient.getEntries<ResourceLinkEntrySkeleton>({
    content_type: 'resourceLink',
  })

  return data
}
