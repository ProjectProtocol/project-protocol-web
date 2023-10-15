import icon from '../images/icon.svg'
import BasicPage from 'src/components/BasicPage'

export default function ContactUs() {
  return (
    <BasicPage title={'Contact Us'} icon={icon}>
      <p>Do you have questions or suggestions?</p>
      <div>
        Email:
        <a href="mailto:info@projectprotocol.org"> info@projectprotocol.org</a>
      </div>
    </BasicPage>
  )
}
