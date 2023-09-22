import icon from '../images/icon.svg'
import StaticPage from 'src/components/StaticPage'

export default function About() {
  return (
    <StaticPage title={'About'} icon={icon}>
      <p>About</p>
    </StaticPage>
  )
}
