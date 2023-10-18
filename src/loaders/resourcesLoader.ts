import { EntryCollection } from 'contentful'
import ResourceLink from 'src/types/ResourceLink'
import ContentfulClient from 'src/util/ContentfulClient'

export default async function (): Promise<EntryCollection<ResourceLink>> {
  const data = await ContentfulClient.getEntries<ResourceLink>({
    content_type: 'resourceLink',
  })

  return data
}
