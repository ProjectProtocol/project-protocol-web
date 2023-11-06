import { Button, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LOGIN_PAGES } from '../LoginModal/constants'
import { useTranslation } from 'react-i18next'

interface IMenuLinks {
  isSignedIn: boolean
  openLogin: (page: number) => void
}
export default function MenuLinks({ isSignedIn, openLogin }: IMenuLinks) {
  const { t } = useTranslation()

  return (
    <>
      <Nav.Link as={NavLink} className="m-0" to="vote">
        {t('navigation.registerToVote')}
      </Nav.Link>
      <Nav.Link as={NavLink} className="m-0" to="">
        {t('navigation.searchOfficers')}
      </Nav.Link>
      <Nav.Link as={NavLink} className="m-0" to="resources">
        {t('navigation.resources')}
      </Nav.Link>
      {isSignedIn ? (
        <>
          <Nav.Link as={NavLink} to="account">
            {t('navigation.account')}
          </Nav.Link>
        </>
      ) : (
        <>
          <Button
            variant="brand"
            onClick={() => {
              openLogin(LOGIN_PAGES.SIGN_UP)
            }}
            className="mx-2 rounded rounded-5"
          >
            {t('navigation.signUp')}
          </Button>
        </>
      )}
    </>
  )
}
