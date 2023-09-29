import { useLoaderData } from 'react-router-dom'
import icon from '../images/icon.svg'
import StaticPage from 'src/components/StaticPage'
import { Entry } from 'contentful'

export default function HowDoesItWork() {
  const entry = useLoaderData() as Entry
  console.log(entry)

  return (
    <StaticPage title={'How does it work'} icon={icon}>
      <p>How does it work?</p>
    </StaticPage>
  )
}
