import { Modal, ModalBody, ModalFooter } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function SuccessModal({ show }: { show: boolean }) {
  return (
    <Modal show={show} centered>
      <ModalBody className="py-5 text-center">
        <i className="bi bi-check-circle text-success fs-1" />
        <h3 className="text-center">Password change successful</h3>
      </ModalBody>
      <ModalFooter className="border-0">
        <Link className="col btn btn-primary btn-lg me-3" to="/" replace={true}>
          Please sign in
        </Link>
      </ModalFooter>
    </Modal>
  )
}
