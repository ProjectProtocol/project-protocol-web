import { Entry } from 'contentful'
import { useLoaderData } from 'react-router-dom'
import { Document } from '@contentful/rich-text-types'
import renderRichText from 'src/util/renderRichText'
import icon from '../images/icon.svg'
import BasicPage from 'src/components/BasicPage'
import { useTranslation } from 'react-i18next'

export default function Vote() {
  const { t } = useTranslation()

  // TODO: Handle translation
  const entry = useLoaderData() as Entry
  const document = entry.fields.body as Document

  return (
    <BasicPage title={t('vote.title')} icon={icon}>
      <div className="w-100 text-center mb-4">
        <a
          className="btn btn-primary btn-lg text-white"
          href="https://registertovote.ca.gov/"
        >
          t('vote.register')
        </a>
      </div>
      {renderRichText(document)}
    </BasicPage>
  )
}
