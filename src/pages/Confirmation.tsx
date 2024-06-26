import { useEffect, useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiConfirmations } from 'src/api'
import toast from 'react-hot-toast'
import { useAuth } from 'src/contexts/auth/AuthContext'
import FullScreenLayout from 'src/components/FullScreenLayout'
import { useTranslate } from '@tolgee/react'

export default function Confirmation() {
  const { t } = useTranslate('account')
  const params = useParams()
  const ignore = useRef(false)
  const navigate = useNavigate()
  const { refreshUser } = useAuth()

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const goHome = (isSuccessful: boolean) => {
      if (isSuccessful) {
        refreshUser()
        toast.success(t('confirmation.success'), {
          id: 'confirmation-result-toast',
        })
      } else {
        toast.error(t('confirmation.error'), {
          id: 'confirmation-result-toast',
        })
      }

      navigate('/', { replace: true })
    }

    if (!ignore.current) {
      ApiConfirmations.create({ token: params.token }).then(
        (result: boolean) => {
          timeoutId = setTimeout(() => goHome(result), 1000)
        },
      )
    }

    return () => {
      ignore.current = true
      timeoutId && clearTimeout(timeoutId)
    }
  }, [navigate, params, refreshUser, t])

  return (
    <FullScreenLayout title={t('confirmation.title')}>
      <div className="text-center vertical-rhythm">
        <p>{t('confirmation.loading')}</p>
        <Spinner />
      </div>
    </FullScreenLayout>
  )
}
