import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import Menu from '../components/Menu'

export default function Home() {
  return (
    <div className="bg-light bg-danger min-vh-100 d-flex flex-column ">
      <ScrollRestoration />
      <Menu />
      <Container className="p-3" style={{ maxWidth: 600 }}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  )
}
