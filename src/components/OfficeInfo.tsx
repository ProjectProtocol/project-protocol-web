import Office from '../types/Office'
import classNames from 'classnames'
import { useTranslate } from '@tolgee/react'

interface IOfficeInfo {
  /** An `Office` object */
  office: Office
  large?: boolean
}

/** Repeatable UI pattern for basic office info */
export default function OfficeInfo({ office, large = false }: IOfficeInfo) {
  const { t } = useTranslate('agent')

  return (
    <div className="d-flex flex-column">
      <span className={classNames('m-0 large', { h2: large, h4: !large })}>
        {office.city}
      </span>
      <span className="mb-1 text-dark h4 lh-sm">{t('office')}</span>
      <p className="m-0 lh-sm">{office.street}</p>
      <p className="m-0 lh-sm">
        {office.city}, {office.state} {office.zip}
      </p>
    </div>
  )
}
