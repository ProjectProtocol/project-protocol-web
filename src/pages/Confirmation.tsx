import { useEffect, useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import icon from '../images/icon.svg'
import { ApiConfirmations } from 'src/api'
import toast from 'react-hot-toast'

export default function Confirmation() {
  const params = useParams()
  const ignore = useRef(false)
  const navigate = useNavigate()

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const goHome = (isSuccessful: boolean) => {
      if (isSuccessful) {
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
  }, [navigate, params])

  return (
    <div className="w-100 d-flex justify-content-center flex-column py-5 align-items-center vh-100">
      <img src={icon} alt="Project Protocol Logo" className="mb-3" />
      <h1 className="mb-3">Email confirmation</h1>
      <p>Please wait...</p>
      <Spinner />
    </div>
  )
}
