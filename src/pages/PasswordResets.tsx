import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ApiPasswordResets } from 'src/api'
import toast from 'react-hot-toast'
import PasswordResetsForm from 'src/components/PasswordResets/PasswordResetsForm'
import SuccessModal from 'src/components/PasswordResets/SuccessModal'
import FullScreenLayout from 'src/components/FullScreenLayout'
import { useTranslate } from '@tolgee/react'

interface IPasswordResetsFormState {
  newPassword: string
  newPasswordConfirm: string
}

export default function PasswordResets() {
  const { token } = useParams()
  const [searchParams] = useSearchParams()
  const originalLocation = searchParams.get('original_location') || '/'
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslate('password_reset')

  useEffect(() => {
    async function validateToken() {
      const isValid = await ApiPasswordResets.get(token || '')
      if (!isValid) {
        toast.error(t('expiredToken'), {
          id: 'invalid-pw-reset-token',
        })
        navigate(originalLocation, { replace: true })
      }
    }
    validateToken()
  }, [token, navigate, t, originalLocation])

  const updatePassword = async ({
    newPassword,
    newPasswordConfirm,
  }: IPasswordResetsFormState) => {
    if (token === undefined) throw new Error(t('invalidToken'))

    const result = await ApiPasswordResets.update({
      newPassword,
      newPasswordConfirm,
      token,
    })
    if (result) {
      setSuccess(true)
    } else {
      toast.error(t('resetRequestError'))
      navigate(originalLocation, { replace: true })
    }
  }

  return (
    <FullScreenLayout title={t('newPassword')}>
      <PasswordResetsForm onSubmit={updatePassword} />
      <SuccessModal show={success} originalLocation={originalLocation} />
    </FullScreenLayout>
  )
}
