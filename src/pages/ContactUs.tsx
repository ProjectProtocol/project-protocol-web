import BasicPage from 'src/components/BasicPage'
import contactEnvelope from '../images/contact-envelope.svg'

export default function ContactUs() {
  return (
    <BasicPage title={'Contact Us'} icon={contactEnvelope}>
      <p className="mb-3">Do you have questions or suggestions?</p>
      <div className="mb-3">
        <span className="me-1">Email:</span>
        <a href="mailto:info@projectprotocol.org">info@projectprotocol.org</a>
      </div>
      <div className="mb-3">
        <span className="me-1">Call or text:</span>
        <a href="tel:(213)915-8585">(213) 915-8585</a>
      </div>
    </BasicPage>
  )
}
