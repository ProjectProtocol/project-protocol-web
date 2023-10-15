import icon from '../images/icon.svg'
import BasicPage from 'src/components/BasicPage'

export default function ContactUs() {
  return (
    <BasicPage title={'Contact Us'} icon={icon}>
      <p>Do you have questions or suggestions?</p>
      <div>
        Email:
        <a href="mailto:info@projectprotocol.org">info@projectprotocol.org</a>
      </div>
      <div>
        Call or text:
        <a href="tel:(213)915-8585">(213) 915-8585</a>
      </div>
    </BasicPage>
  )
}
