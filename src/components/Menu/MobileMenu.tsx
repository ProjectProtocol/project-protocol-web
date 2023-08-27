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
  const [showDrawer, setShowDrawer] = useState(true)
  const open = () => setShowDrawer(true)
  const close = () => setShowDrawer(false)

  let location = useLocation();
  useEffect(() => {
    if (location) {
      close()
    }
  }, [location])

  const MenuLink = ({ url, label }: { url: string, label: string }) => (
    <Nav.Item className="mb-2">
      <NavLink
        to={url}
        className={({ isActive }) => classNames(
          'fs-2 text-decoration-none',
          { 'text-info': isActive, 'text-body': !isActive }
        )}
        end>
        {label}
      </NavLink>
    </Nav.Item>
  )

  return (
    <>
      <Button variant="link" className="d-md-none" onClick={open} >
        <i className="bi bi-list text-body fs-2" />
      </Button>
      <Offcanvas show={showDrawer} onHide={close} placement="end" style={{ width: 250 }}>
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <Nav defaultActiveKey="/" className="flex-column align-items-center">
            <MenuLink url="/" label="Search officers" />
            <MenuLink url="/resources" label="Resources" />
            <MenuLink url="/account" label="Account" />
            {user && (
              <Nav.Item className="mb-2">
                <Nav.Link onClick={logout} className="fs-2" >
                  Sign out
                </Nav.Link>
              </Nav.Item>)}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
