import { useEffect, useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import icon from '../images/icon.svg'
import { ApiConfirmations } from 'src/api'
import toast from 'react-hot-toast'
import { useAuth } from 'src/contexts/auth/AuthContext'
import BasicPage from 'src/components/BasicPage'

export default function Confirmation() {
  const { t } = useTranslation()
  const params = useParams()
  const ignore = useRef(false)
  const navigate = useNavigate()
  const { refreshUser } = useAuth()

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const goHome = (isSuccessful: boolean) => {
      if (isSuccessful) {
        refreshUser()
        toast.success(t('account.confirmation.success'), {
          id: 'confirmation-result-toast',
        })
      } else {
        toast.error(t('account.confirmation.error'), {
          id: 'confirmation-result-toast',
        })
      }

      navigate('/', { replace: true })
    }

    if (!ignore.current) {
      ApiConfirmations.create({ token: params.token }).then(
        (result: boolean) => {
          timeoutId = setTimeout(() => goHome(result), 3000)
        },
      )
    }

    return () => {
      ignore.current = true
      timeoutId && clearTimeout(timeoutId)
    }
  }, [navigate, params, refreshUser, t])

  return (
    <BasicPage title={t('account.confirmation.title')} icon={icon} fullScreen>
      <div className="text-center vertical-rhythm">
        <p>{t('account.confirmation.loading')}</p>
        <Spinner />
      </div>
    </BasicPage>
  )
}
