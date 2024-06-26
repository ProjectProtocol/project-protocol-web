import { Entry } from 'contentful'
import { useLoaderData } from 'react-router-dom'
import { Document } from '@contentful/rich-text-types'
import renderRichText from 'src/util/renderRichText'
import icon from '../images/icon.svg'
import BasicPage from 'src/components/BasicPage'
import { useTranslate } from '@tolgee/react'

export default function Vote() {
  const { t } = useTranslate('home')

  const entry = useLoaderData() as Entry
  const document = entry.fields.body as Document

  return (
    <BasicPage title={t('vote.register')} icon={icon}>
      <div className="w-100 text-center mb-4">
        <a
          className="btn btn-primary btn-lg"
          href="https://registertovote.ca.gov/"
          target="_blank"
        >
          {t('vote.register')}
        </a>
      </div>
      <h3>{t('vote.title')}</h3>
      {renderRichText(document)}
    </BasicPage>
  )
}
