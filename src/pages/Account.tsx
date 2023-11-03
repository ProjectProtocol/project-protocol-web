import { Navigate } from 'react-router-dom'
import BasicPage from 'src/components/BasicPage'
import icon from 'src/images/icon.svg'
import { Button, Col, Row } from 'react-bootstrap'
import AccountSettingsRow from 'src/components/AccountSettingsRow'
import { useState } from 'react'
import { ApiConfirmations, ApiProfile, ApiUsers } from 'src/api'
import toast from 'react-hot-toast'
import AccountDeleteModal from 'src/components/AccountDeleteModal'
import { useAuth } from 'src/contexts/auth/AuthContext'
import ChangePasswordModal, {
  IChangePasswordModalFormState,
} from 'src/components/ChangePasswordModal'

export default function AccountView() {
  const { user, setUser, handleLogout } = useAuth()
  const [resentCode, setResentCode] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)

  if (!user) {
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

  const changePassword = async (data: IChangePasswordModalFormState) => {
    const success = await ApiProfile.update(data)

    if (success) {
      toast.success('Password changed')
      setShowChangePasswordModal(false)
    } else {
      toast.error('Password change failed')
    }
  }

  const deleteAccount = async (data: { password: string }) => {
    const userPassword = data.password

    await ApiUsers.destroy(userPassword)
      .then(() => {
        toast.success('Account successfully deleted')
        setUser(undefined)
      })
      .catch(() => {
        toast.error('Incorrect password entered. Please try again.')
      })
  }

  return (
    <BasicPage title="Account settings" icon={icon}>
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
            <Button
              variant="outline-dark"
              size="sm"
              title="Change password"
              onClick={() => setShowChangePasswordModal(true)}
            >
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
      <ChangePasswordModal
        show={showChangePasswordModal}
        onHide={() => setShowChangePasswordModal(false)}
        onSubmit={changePassword}
      />
      <AccountDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onSubmit={deleteAccount}
      />
    </BasicPage>
  )
}
