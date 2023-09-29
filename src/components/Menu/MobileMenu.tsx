import { Nav, Offcanvas, OffcanvasProps } from 'react-bootstrap'

interface IMobileMenu extends OffcanvasProps {
  children: React.ReactNode
}

export default function MobileMenu({ children, ...drawerProps }: IMobileMenu) {
  return (
    <Offcanvas placement="end" style={{ width: 250 }} {...drawerProps}>
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
  )
}
