import { useLoaderData } from 'react-router-dom'
import icon from '../images/icon.svg'
import StaticPage from 'src/components/StaticPage'
import { Entry } from 'contentful'

export default function TermsOfService() {
  const entry = useLoaderData() as Entry
  console.log(entry)

  return (
    <StaticPage title={'Terms of Service'} icon={icon}>
      <p>Terms of Service</p>
    </StaticPage>
  )
}
