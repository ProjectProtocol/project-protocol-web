import icon from '../images/icon.svg'
import BasicPage from 'src/components/BasicPage'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { ApiPasswordResets } from 'src/api'
import toast from 'react-hot-toast'
import PasswordResetsForm from 'src/components/PasswordResets/PasswordResetsForm'
import SuccessModal from 'src/components/PasswordResets/SuccessModal'

interface IPasswordResetsFormState {
  newPassword: string
  newPasswordConfirm: string
}

export default function PasswordResets() {
  const { token } = useParams()
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    async function validateToken() {
      const isValid = await ApiPasswordResets.get(token || '')
      if (!isValid) {
        toast.error('Password reset has expired, please try again', {
          id: 'invalid-pw-reset-token',
        })
        navigate('/', { replace: true })
      }
    }
    validateToken()
  }, [token, navigate])

  const updatePassword = async ({
    newPassword,
    newPasswordConfirm,
  }: IPasswordResetsFormState) => {
    if (token === undefined) throw new Error('Invalid request')

    const result = await ApiPasswordResets.update({
      newPassword,
      newPasswordConfirm,
      token,
    })
    if (result) {
      setSuccess(true)
    } else {
      toast.error('Password change failed, please try again.')
      navigate('/', { replace: true })
    }
  }

  return (
    <BasicPage icon={icon} title={t('account.newPassword')} fullScreen>
      <PasswordResetsForm onSubmit={updatePassword} />
      <SuccessModal show={success} />
    </BasicPage>
  )
}
