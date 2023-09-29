import { useLoaderData } from 'react-router-dom'
import icon from '../images/icon.svg'
import StaticPage from 'src/components/StaticPage'
import { Entry } from 'contentful'

export default function Resources() {
  const entry = useLoaderData() as Entry
  console.log(entry)

  return (
    <StaticPage title={'Resources'} icon={icon}>
      <p>Resources</p>
    </StaticPage>
  )
}
