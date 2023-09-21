import { useState } from 'react'
import { Button, Nav, Offcanvas } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import User from '../../types/User'
import { useEffect } from 'react'

interface IMobileMenu {
  user?: User
  children: React.ReactNode
}

export default function MobileMenu({ children }: IMobileMenu) {
  const location = useLocation()
  const [showDrawer, setShowDrawer] = useState(true)
  const open = () => setShowDrawer(true)
  const close = () => setShowDrawer(false)

  useEffect(() => {
    if (location) {
      close()
    }
  }, [location])

  return (
    <div className="d-md-none">
      <Button variant="link" onClick={open}>
        <i className="bi bi-list text-body fs-2" />
      </Button>
      <Offcanvas
        show={showDrawer}
        onHide={close}
        placement="end"
        style={{ width: 250 }}
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <Nav
            defaultActiveKey="/"
            className="flex-column align-items-center fs-3"
          >
            {children}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
