import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ApiConfirmations } from 'src/api'
import icon from '../images/icon.svg'

export default function Confirmation() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!loading) {
      setLoading(true)
      token &&
        ApiConfirmations.create({ token }).then((result) => {
          console.log('butts')
          setTimeout(() => {
            if (result) {
              toast.success('Wow')
            } else {
              toast.error('Unable to verify account. Please try again.')
            }
            navigate('/')
          }, 3000)
        })
    }
  }, [loading, navigate, token])

  return (
    <div className="w-100 d-flex justify-content-center flex-column py-5 align-items-center vh-100">
      <img src={icon} alt="Project Protocol Logo" className="mb-3" />
      <h1 className="mb-3">Email confirmation</h1>
      <p className="mb-3">Please wait</p>
      <Spinner />
    </div>
  )
}
