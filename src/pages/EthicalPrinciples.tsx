import { Entry } from 'contentful'
import icon from '../images/icon.svg'
import StaticPage from 'src/components/StaticPage'
import { useLoaderData } from 'react-router-dom'

export default function EthicalPrinciples() {
  const entry = useLoaderData() as Entry
  console.log(entry)

  return (
    <StaticPage title={'Ethical Principles'} icon={icon}>
      <p>Ethical Principles</p>
    </StaticPage>
  )
}
