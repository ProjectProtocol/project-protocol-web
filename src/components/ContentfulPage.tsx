import { Entry } from 'contentful'
import { useLoaderData } from 'react-router-dom'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import BasicPage from './BasicPage'

interface IContentfulPage {
  title: string
  icon: string
}

export default function ContentfulPage({ title, icon }: IContentfulPage) {
  const entry = useLoaderData() as Entry
  const document = entry.fields.body as Document

  return (
    <BasicPage title={title} icon={icon}>
      {documentToReactComponents(document)}
    </BasicPage>
  )
}
