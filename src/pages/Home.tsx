import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import Footer from "../components/Footer"
import Menu from "../components/Menu"

export default function Home() {
  return (
    <div className="bg-light d-flex flex-column h-100">
      <Menu />
      <Container className="p-3" style={{ maxWidth: 600, flex: 1 }}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  )
}
