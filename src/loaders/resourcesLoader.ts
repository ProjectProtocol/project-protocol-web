import { EntryCollection } from 'contentful'
import { LoaderFunctionArgs } from 'react-router-dom'
import ResourceLink from 'src/types/ResourceLink'
import ContentfulClient from 'src/util/ContentfulClient'

export default async function ({} // request,
: LoaderFunctionArgs): Promise<EntryCollection<ResourceLink>> {
  const data = await ContentfulClient.getEntries<ResourceLink>({
    content_type: 'resourceLink',
  })

  return data
}
