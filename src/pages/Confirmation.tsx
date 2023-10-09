import { useEffect, useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import icon from '../images/icon.svg'
import { ApiConfirmations } from 'src/api'
import toast from 'react-hot-toast'
import { useAuth } from 'src/contexts/auth/AuthContext'
import BasicPage from 'src/components/BasicPage'

export default function Confirmation() {
  const params = useParams()
  const ignore = useRef(false)
  const navigate = useNavigate()
  const { refreshUser } = useAuth()

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const goHome = (isSuccessful: boolean) => {
      if (isSuccessful) {
        refreshUser()
        toast.success('Confirmation successful', {
          id: 'confirmation-result-toast',
        })
      } else {
        toast.error('Unable to verify account, please try again', {
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
  }, [navigate, params, refreshUser])

  return (
    <BasicPage title="Email confirmation" icon={icon} fullScreen>
      <div className="text-center vertical-rhythm">
        <p>Please wait...</p>
        <Spinner />
      </div>
    </BasicPage>
  )
}
