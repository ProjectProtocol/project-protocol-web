import { useTranslation } from 'react-i18next'
import BasicPage from 'src/components/BasicPage'
import contactEnvelope from '../images/contact-envelope.svg'

export default function ContactUs() {
  const { t } = useTranslation()

  return (
    <BasicPage title={t('contact.title')} icon={contactEnvelope}>
      <p className="mb-3">{t('contact.questions')}</p>
      <div className="mb-3">
        <span className="me-1">{t('contact.email')}</span>
        <a href="mailto:info@projectprotocol.org">info@projectprotocol.org</a>
      </div>
      <div className="mb-3">
        <span className="me-1">{t('contact.callOrText')}</span>
        <a href="tel:(213)915-8585">(213) 915-8585</a>
      </div>
    </BasicPage>
  )
}
