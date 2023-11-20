import { useTranslation } from 'react-i18next'
import icon from '../images/icon.svg'
import BasicPage from 'src/components/BasicPage'

export default function TermsOfService() {
  const { t } = useTranslation()
  return (
    <BasicPage title={t('tos.title')} icon={icon}>
      <p>t('tos.details')</p>
    </BasicPage>
  )
}
