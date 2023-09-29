import { useLoaderData } from 'react-router-dom'
import icon from '../images/icon.svg'
import StaticPage from 'src/components/StaticPage'
import { Entry } from 'contentful'

export default function About() {
  const entry = useLoaderData() as Entry
  console.log(entry)

  return (
    <StaticPage title={'About'} icon={icon}>
      <p>About</p>
    </StaticPage>
  )
}
