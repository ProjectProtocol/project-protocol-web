import { Entry } from 'contentful'
import { useLoaderData } from 'react-router-dom'
import { Document } from '@contentful/rich-text-types'
import BasicPage from './BasicPage'
import renderRichText from 'src/util/renderRichText'

interface IContentfulPage {
  title: string | JSX.Element
  icon: string
}

export default function ContentfulPage({ title, icon }: IContentfulPage) {
  const entry = useLoaderData() as Entry
  const document = entry.fields.body as Document

  return (
    <BasicPage title={title} icon={icon}>
      {renderRichText(document)}
    </BasicPage>
  )
}
