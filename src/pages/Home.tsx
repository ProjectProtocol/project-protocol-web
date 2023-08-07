import { Col, Row } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import Menu from "./Menu"

export default function Home() {
  return (
    <div className="vh-100">
      <Row>
        <Col sm={3}>
          <div className="p-3">
            <Menu />
          </div>
        </Col>
        <Col>
          <div className="p-3">
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  )
}
