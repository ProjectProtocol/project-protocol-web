import BasicPage from 'src/components/BasicPage'
import contactEnvelope from '../images/contact-envelope.svg'
// import contactStripes from '..images/contact-stripes.svg'

export default function ContactUs() {
  return (
    <BasicPage title={'Contact Us'} icon={contactEnvelope}>
      <p className="mb-3">Do you have questions or suggestions?</p>
      <div className="mb-3">
        Email:
        <a href="mailto:info@projectprotocol.org">info@projectprotocol.org</a>
      </div>
      <div className="mb-3">
        Call or text:
        <a href="tel:(213)915-8585">(213) 915-8585</a>
      </div>
    </BasicPage>
  )
}
