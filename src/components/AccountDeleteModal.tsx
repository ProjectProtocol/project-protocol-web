import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalProps,
} from 'react-bootstrap'

interface IAccountDeleteModal extends ModalProps {}

export default function AccountDeleteModal({
  ...modalProps
}: IAccountDeleteModal) {
  return (
    <Modal centered {...modalProps}>
      <div className="modal-header border-0">
        <div className="w-100 text-end">
          <a className="link-dark" role="button" onClick={modalProps.onHide}>
            <i className="bi bi-x fs-3" />
          </a>
        </div>
      </div>
      <ModalBody>
        <h3>
          <i className="bi bi-exclamation-diamond text-danger me-2" /> Delete
          Account?
        </h3>
        <p>This action cannot be undone</p>
      </ModalBody>
      <ModalFooter className="justify-content-between">
        <Button variant="tertiary" onClick={modalProps.onHide}>
          Cancel
        </Button>
        <Button variant="danger">Delete my account</Button>
      </ModalFooter>
    </Modal>
  )
}
