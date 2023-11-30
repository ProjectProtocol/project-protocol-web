import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  if (!user) {
    return <Navigate to="/" />
  }

  const requestConfirmationCode = async () => {
    const success = await ApiConfirmations.resend()
    if (success) {
      setResentCode(true)
    } else {
      toast.error(t('error.generic'))
    }
  }

  const changePassword = async (data: IChangePasswordModalFormState) => {
    const success = await ApiProfile.update(data)

    if (success) {
      toast.success(t('account.changePassword.success'))
      setShowChangePasswordModal(false)
    } else {
      toast.error(t('account.changePassword.error'))
    }
  }

  const deleteAccount = async (data: { password: string }) => {
    const userPassword = data.password

    await ApiUsers.destroy(userPassword)
      .then(() => {
        toast.success(t('account.delete.success'))
        setUser(undefined)
      })
      .catch(() => {
        toast.error(t('account.delete.error'))
      })
  }

  return (
    <BasicPage title={t('account.title')} icon={icon}>
      <Row className="gy-4 mt-5">
        {!user.isConfirmed && (
          <>
            <AccountSettingsRow
              title={t('account.confirm')}
              detail={t('account.confirmDetail', { email: user.email })}
              action={
                resentCode ? (
                  <p>
                    {t('account.confirmationSent')}
                    <i className="bi bi-check-circle text-success ms-2" />
                  </p>
                ) : (
                  <a
                    className="btn btn-brand btn-sm"
                    role="button"
                    onClick={requestConfirmationCode}
                  >
                    {t('account.resendCode')}
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
          title={t('account.email')}
          detail={user.email}
          action={
            <Button variant="outline-dark" size="sm" onClick={handleLogout}>
              {t('account.signOut')}
            </Button>
          }
        />
        <AccountSettingsRow
          title={t('account.changePassword.title')}
          detail={t('account.changePassword.detail')}
          action={
            <Button
              variant="outline-dark"
              size="sm"
              title="Change password"
              onClick={() => setShowChangePasswordModal(true)}
            >
              {t('account.changePassword.action')}
            </Button>
          }
        />
        <AccountSettingsRow
          title={t('account.delete.title')}
          detail={t('account.delete.detail')}
          action={
            <Button
              variant="outline-danger"
              size="sm"
              title={t('account.delete.title')}
              onClick={() => setShowDeleteModal(true)}
            >
              <i className="bi bi-trash me-2" />
              {t('account.delete.action')}
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
