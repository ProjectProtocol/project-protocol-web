import { Outlet } from "react-router-dom"
import Menu from "./Menu"
import { Container } from "react-bootstrap"

export default function Home() {
  return (
    <div className="vh-100 bg-light">
      <Menu />
      <Container className="p-3" style={{ maxWidth: 800 }}>
        <Outlet />
      </Container>
    </div>
  )
}
