import { Link } from 'react-router-dom'
import PopUp from '../PopUp'

export default function SuccessModal({ show }: { show: boolean }) {
  return (
    <PopUp show={show}>
      <div className="text-center">
        <h3 className="text-center">Password reset successful</h3>
        <div className="py-4">
          <i className="bi bi-check-circle text-success fs-1" />
          <p>You can now sign in to your account using your new password.</p>
        </div>

        <div className="d-flex">
          <Link className="col btn btn-primary btn-lg" to="/" replace={true}>
            OK
          </Link>
        </div>
      </div>
    </PopUp>
  )
}
