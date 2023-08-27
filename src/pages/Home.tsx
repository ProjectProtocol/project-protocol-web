import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import Footer from "../components/Footer"
import Menu from "../components/Menu"

export default function Home() {
  return (
    <div className="bg-light">
      <Menu />
      <Container className="p-3" style={{ maxWidth: 600 }}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  )
}
