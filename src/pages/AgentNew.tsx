import { useNavigate } from 'react-router-dom'
import { Button, FloatingLabel, Form, Nav } from 'react-bootstrap'
import icon from '../images/icon.svg'

export default function AgentNew() {
  const navigate = useNavigate()

  return (
    <div>
      <a role="button" onClick={() => navigate(-1)}>
        <i className="bi bi-chevron-left align-middle" />
        Back
      </a>
      <div className="text-center">
        {/* place text horizontal to 'Back' nav link? */}
        <h2 className="m-3 fw-normal">Add listing</h2>
      </div>
      {/* switch to officer icon */}
      <div className="mb-4 text-center">
        <img src={icon} alt="ProPro logo" style={{ width: 50 }} />
      </div>
      <div className="p-4">
        <h3 className="mb-3">Add an agent</h3>
        <div className="text-start">
          <h5 className="mb-4 fw-normal">
            Use this form to contribute a new agent listing to the Project
            Protocol database. After creation, you and others will be able to
            read and contribute to reviews about first hand experiences with
            this individual.
          </h5>
        </div>
        <div className="text-end">
          <h4 className="text-start">Agent Info</h4>
        </div>
        <FloatingLabel label="Agent first name" className="m-4 w-100">
          <Form.Control placeholder="Agent first name" />
        </FloatingLabel>
        <FloatingLabel label="Agent last name" className="m-4 w-100">
          <Form.Control placeholder="Agent last name" />
        </FloatingLabel>
        <h4 className="text-start">Office</h4>
        <div className="m-5">
          <Nav className="fs-3 text-decoration-underline justify-content-center">
            {/* change link text to black or underline to orange? */}
            <Nav.Link>Select an office</Nav.Link>
          </Nav>
        </div>
        <Button size="lg" variant="primary" type="submit" className="m-4 w-100">
          Create agent listing
        </Button>
      </div>
    </div>
  )
}
