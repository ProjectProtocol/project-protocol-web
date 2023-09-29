import { useLoaderData } from 'react-router-dom'
import icon from '../images/icon.svg'
import StaticPage from 'src/components/StaticPage'
import { Entry } from 'contentful'

export default function ContactUs() {
  const entry = useLoaderData() as Entry
  console.log(entry)

  return (
    <StaticPage title={'Contact Us'} icon={icon}>
      <p>Contact Us</p>
    </StaticPage>
  )
}
