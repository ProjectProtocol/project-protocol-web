import { useState } from "react";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import User from "../../types/User";
import { useEffect } from "react";
import classNames from "classnames";

interface IMobileMenu {
  user?: User,
  logout: () => void
}

export default function MobileMenu({ user, logout }: IMobileMenu) {
  const location = useLocation();
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
      <Button variant="link" onClick={open} >
        <i className="bi bi-list text-body fs-2" />
      </Button>
      <Offcanvas show={showDrawer} onHide={close} placement="end" style={{ width: 250 }}>
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <Nav defaultActiveKey="/" className="flex-column align-items-center fs-3">
            <Nav.Link as={NavLink} className="m-0" to="">Search officers</Nav.Link>
            <Nav.Link as={NavLink} className="m-0" to="resources">Resources</Nav.Link>
            <Nav.Link as={NavLink} className="m-0" to="account">Account</Nav.Link>
            {user && (
              <Nav.Link onClick={logout} role="button">
                Sign out
              </Nav.Link>)}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
