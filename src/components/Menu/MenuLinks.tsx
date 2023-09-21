import { Button, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LOGIN_PAGES } from '../LoginModal/constants'

interface IMenuLinks {
  isSignedIn: boolean
  logout: () => void
  openLogin: (page: number) => void
}
export default function MenuLinks({
  isSignedIn,
  logout,
  openLogin,
}: IMenuLinks) {
  return (
    <>
      <Nav.Link as={NavLink} className="m-0" to="">
        Search officers
      </Nav.Link>
      <Nav.Link as={NavLink} className="m-0" to="resources">
        Resources
      </Nav.Link>
      {isSignedIn ? (
        <>
          <Nav.Link as={NavLink} to="account">
            Account
          </Nav.Link>
          <Nav.Link role="button" onClick={logout}>
            Sign out
          </Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link onClick={() => openLogin(LOGIN_PAGES.SIGN_IN)}>
            Log In
          </Nav.Link>
          <Button
            variant="brand"
            onClick={() => {
              openLogin(LOGIN_PAGES.SIGN_UP)
            }}
            className="mx-2 rounded rounded-5"
          >
            Sign up
          </Button>
        </>
      )}
    </>
  )
}
