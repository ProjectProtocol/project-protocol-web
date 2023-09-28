import { Navigate } from 'react-router-dom'
import StaticPage from 'src/components/StaticPage'
import icon from 'src/images/icon.svg'
import { Button, Col, Row } from 'react-bootstrap'
import AccountSettingsRow from 'src/components/AccountSettingsRow'
import { useState } from 'react'
import { ApiConfirmations } from 'src/api'
import toast from 'react-hot-toast'
import AccountDeleteModal from 'src/components/AccountDeleteModal'
import { useAuth } from 'src/contexts/auth/AuthContext'

export default function AccountView() {
  const { user, handleLogout } = useAuth()
  const [resentCode, setResentCode] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (!user) {
    console.log('what the fuck')
    return <Navigate to="/" />
  }

  const requestConfirmationCode = async () => {
    const success = await ApiConfirmations.resend()
    if (success) {
      setResentCode(true)
    } else {
      toast.error('Something went wrong, please try again')
    }
  }

  return (
    <StaticPage title="Account settings" icon={icon}>
      <Row className="gy-4 mt-5">
        {!user.isConfirmed && (
          <>
            <AccountSettingsRow
              title="Please confirm your account"
              detail={`We sent an email to ${user.email} with confirmation instructions. Be sure to check your spam and junk folders`}
              action={
                resentCode ? (
                  <p>
                    Confirmation sent
                    <i className="bi bi-check-circle text-success ms-2" />
                  </p>
                ) : (
                  <a
                    className="btn btn-brand btn-sm"
                    role="button"
                    onClick={requestConfirmationCode}
                  >
                    Resend code
                  </a>
                )
              }
            />
            <Col xs={12}>
              <hr />
            </Col>
          </>
        )}
        <AccountSettingsRow
          title="Email"
          detail={user.email}
          action={
            <Button variant="outline-dark" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          }
        />
        <AccountSettingsRow
          title="Change password"
          detail="Password must be at least 8 characters long"
          action={
            <Button variant="outline-dark" size="sm" title="Change password">
              Change
            </Button>
          }
        />
        <AccountSettingsRow
          title="Delete account"
          detail="Remove account and all of your reviews from Project Protocol."
          action={
            <Button
              variant="outline-danger"
              size="sm"
              title="Delete account"
              onClick={() => setShowDeleteModal(true)}
            >
              <i className="bi bi-trash me-2" />
              Delete
            </Button>
          }
        />
      </Row>
      <AccountDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      />
    </StaticPage>
  )
}
