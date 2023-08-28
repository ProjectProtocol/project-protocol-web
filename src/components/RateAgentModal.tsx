import { Button, Modal } from 'react-bootstrap'
import Agent from '../types/Agent'

interface IRateAgentModal {
  agent: Agent
  show: boolean
  close: () => void
}

export default function RateAgentModal({
  agent,
  close,
  show,
}: IRateAgentModal) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={close}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {agent.fullName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
