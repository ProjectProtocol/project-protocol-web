import { Entry } from 'contentful'
import { useLoaderData } from 'react-router-dom'
import { Document } from '@contentful/rich-text-types'
import renderRichText from 'src/util/renderRichText'
import icon from '../images/icon.svg'
import BasicPage from 'src/components/BasicPage'

export default function Vote() {
  const entry = useLoaderData() as Entry
  const document = entry.fields.body as Document

  return (
    <BasicPage title={'Voting rights restored in California'} icon={icon}>
      <div className="w-100 text-center mb-4">
        <a
          className="btn btn-primary btn-lg text-white"
          href="https://registertovote.ca.gov/"
        >
          Register to vote
        </a>
      </div>
      {renderRichText(document)}
    </BasicPage>
  )
}
