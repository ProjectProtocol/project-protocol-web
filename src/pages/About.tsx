import icon from '../images/icon.svg'
import BasicPage from 'src/components/BasicPage'
import { useLoaderData } from 'react-router-dom'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export default function About() {
  const entry = useLoaderData() as Entry
  const document = entry.fields.body as Document
  const title = entry.fields.title as string

  return (
    <BasicPage title={title} icon={icon}>
      <div>{documentToReactComponents(document)}</div>
    </BasicPage>
  )
}
