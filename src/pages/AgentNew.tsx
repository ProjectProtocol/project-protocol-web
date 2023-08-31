import { useNavigate, Link } from 'react-router-dom'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import icon from '../images/icon.svg'

export default function AgentNew() {
  const navigate = useNavigate()

  return (
    <div>
      <a role="button" onClick={() => navigate(-1)}>
        <i className="bi bi-chevron-left align-middle" />
        Back
      </a>
      {/* place text horizontal to 'Back' nav link? */}
      <h2 className="mb-4 fw-normal text-center">Add listing</h2>
      {/* switch to officer icon */}
      <div className="mb-4 text-center">
        <img src={icon} alt="ProPro logo" style={{ width: 50 }} />
      </div>
      <div className="p-4 text-start">
        <h2 className="mb-2">Add an agent</h2>
        <h5 className="mb-5 fw-normal">
          Use this form to contribute a new agent listing to the Project
          Protocol database. After creation, you and others will be able to read
          and contribute to reviews about first hand experiences with this
          individual.
        </h5>
        <h3 className="mb-3">Agent Info</h3>
        <FloatingLabel label="Agent first name" className="mb-3 w-100">
          <Form.Control placeholder="Agent first name" />
        </FloatingLabel>
        <FloatingLabel label="Agent last name" className="mb-4 w-100">
          <Form.Control placeholder="Agent last name" />
        </FloatingLabel>
        <h3 className="mb-5">Office</h3>
        <div className="mb-5 text-decoration-underline text-center">
          {/* add url */}
          <Link to="">Select an office</Link>
        </div>
        <Button
          size="lg"
          variant="primary"
          type="submit"
          className="mt-5 w-100"
        >
          Create agent listing
        </Button>
      </div>
    </div>
  )
}
