import { useNavigate, Link } from 'react-router-dom'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import officerIcon from '../images/officer-icon.svg'
import SelectOfficeModal from 'src/components/SelectOfficeModal'
import { useEffect, useState } from 'react'
import Office from 'src/types/Office'
import { ApiSearch } from 'src/api'
import { debounce } from 'lodash'

export default function AgentNew() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [offices, setOffices] = useState<Office[]>([])
  const [officeSearchText, setOfficeSearchText] = useState('')

  const getOffices = async (searchText: string) => {
    const { data } = await ApiSearch.search({ searchText, filter: 'Office' })
    setOffices(data as Office[])
  }

  const handleSearchInput = debounce(getOffices, 500)

  useEffect(() => {
    if (officeSearchText !== '') {
      handleSearchInput(officeSearchText)
    }
  }, [officeSearchText, handleSearchInput])

  return (
    <div>
      <a role="button" onClick={() => navigate(-1)}>
        <i className="bi bi-chevron-left align-middle" />
        Back
      </a>
      <div className="d-flex justify-content-center mb-3">
        <div
          className="d-flex justify-content-center align-items-center bg-white rounded-circle"
          style={{ width: 80, height: 80 }}
        >
          <img src={officerIcon} alt="Officer icon" width="50%" />
        </div>
      </div>
      <div className="p-4 text-start">
        <h2 className="mb-2">Add an agent</h2>
        <p className="mb-5">
          Use this form to contribute a new agent listing to the Project
          Protocol database. After creation, you and others will be able to read
          and contribute to reviews about first hand experiences with this
          individual.
        </p>
        <h3 className="mb-3">Agent Info</h3>
        <FloatingLabel label="Agent first name" className="mb-3 w-100">
          <Form.Control placeholder="Agent first name" />
        </FloatingLabel>
        <FloatingLabel label="Agent last name" className="mb-3 w-100">
          <Form.Control placeholder="Agent last name" />
        </FloatingLabel>
        <h3 className="mb-3">Office</h3>
        <div className="p-3 mb-3 text-center">
          <Link to="" className="link-dark" onClick={() => setShowModal(true)}>
            Select an office
          </Link>
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
      <SelectOfficeModal
        onChange={setOfficeSearchText}
        searchText={officeSearchText}
        show={showModal}
        offices={offices}
        close={() => setShowModal(false)}
      />
    </div>
  )
}
