import { useTranslation } from 'react-i18next'
import Office from '../types/Office'

interface IOfficeInfo {
  /** An `Office` object */
  office: Office
}

/** Repeatable UI pattern for basic office info */
export default function OfficeInfo({ office }: IOfficeInfo) {
  const { t } = useTranslation()

  return (
    <div className="d-flex flex-column">
      <span className="m-0 large h4 lh-sm">{office.city}</span>
      <span className="mb-1 text-dark h4 lh-sm">{t('agent.office')}</span>
      <p className="m-0 lh-sm">{office.street}</p>
      <p className="m-0 lh-sm">
        {office.city}, {office.state} {office.zip}
      </p>
    </div>
  )
}
