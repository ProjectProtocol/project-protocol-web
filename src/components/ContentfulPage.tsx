import { Entry } from 'contentful'
import { useLoaderData } from 'react-router-dom'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { IBasicPage } from './BasicPage'

interface IContentfulPage {
  title: string
  icon: string
}

export default function ContentfulPage({ title, icon }: IContentfulPage) {
  const entry = useLoaderData() as Entry
  const document = entry.fields.body as Document

  return (
    <div className="px-4 pb-4 pt-5">
      <div className="d-flex justify-content-center mb-4">
        <div
          className="d-flex justify-content-center align-items-center bg-white rounded-circle"
          style={{ width: 80, height: 80 }}
        >
          <img src={icon} alt="icon" width="50%" />
        </div>
      </div>
      <h2 className="mb-4 text-center">{title}</h2>
      {documentToReactComponents(document)}
    </div>
  )
}
