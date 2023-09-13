import { useNavigate, Link } from 'react-router-dom'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import officerIcon from '../images/officer-icon.svg'
import SelectOfficeModal from 'src/components/SelectOfficeModal'
import { useEffect, useState } from 'react'
import Office from 'src/types/Office'
import { ApiAgent, ApiSearch } from 'src/api'
import { debounce } from 'lodash'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import SearchResult from 'src/components/SearchResult'
import toast from 'react-hot-toast'

interface IAddAnAgentForm {
  firstName: string
  lastName: string
  office: Office
}

export default function AgentNew() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [offices, setOffices] = useState<Office[]>([])
  const [officeSearchText, setOfficeSearchText] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<IAddAnAgentForm>({
    mode: 'onSubmit',
    defaultValues: { firstName: '', lastName: '', office: undefined },
  })

  const office = watch('office')

  const getOffices = async (searchText: string) => {
    const { data } = await ApiSearch.search({ searchText, filter: 'Office' })
    setOffices(data as Office[])
  }

  const handleClose = () => {
    setShowModal(false)
    setOfficeSearchText('')
  }

  const onSubmit: SubmitHandler<IAddAnAgentForm> = async ({
    office,
    ...params
  }: IAddAnAgentForm) => {
    const newAgent = await ApiAgent.create({
        ...params,
        officeId: office.id,
      })

      if (newAgent) {
        toast.success('Agent created')
        navigate(`/agents/${newAgent.agent.id}`, { replace: true })
      } else {
        toast.error('Something went wrong, please try again')
      }
  }

  useEffect(() => {
    const handleSearchInput = debounce(getOffices, 500)

    if (officeSearchText !== '') {
      handleSearchInput(officeSearchText)
    }

    return () => handleSearchInput.cancel()
  }, [officeSearchText])

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <FloatingLabel label="Agent first name" className="mb-3 w-100">
              <Form.Control
                type="text"
                placeholder="Agent first name"
                isInvalid={!!errors?.firstName}
                {...register('firstName', {
                  required: `Please provide a first name`,
                })}
              />
              {!!errors?.firstName && (
                <small className="text-danger">
                  {errors?.firstName?.message}
                </small>
              )}
            </FloatingLabel>
          </Form.Group>
          <FloatingLabel label="Agent last name" className="mb-3 w-100">
            <Form.Control
              type="text"
              placeholder="Agent last name"
              isInvalid={!!errors?.lastName}
              {...register('lastName', {
                required: `Please provide a last name`,
              })}
            />
            {!!errors?.lastName && (
              <small className="text-danger">{errors?.lastName?.message}</small>
            )}
          </FloatingLabel>
          <div className="mb-3">
            <h3 className="mb-0">Office</h3>
            {!!errors?.office && (
              <small className="text-danger">{errors?.office?.message}</small>
            )}
          </div>
          <div className="p-3 mb-3">
            {office ? (
              <div>
                <SearchResult result={office} />
                <div className="text-center">
                  <a
                    className="link-dark"
                    role="button"
                    onClick={() => setShowModal(true)}
                  >
                    Edit
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Link
                  to=""
                  className="link-dark"
                  onClick={() => setShowModal(true)}
                >
                  Select an office
                </Link>
              </div>
            )}
          </div>
          <Button
            size="lg"
            variant="primary"
            disabled={!errors}
            type="submit"
            className="mt-5 w-100"
          >
            Create agent listing
          </Button>
        </form>
      </div>
      <Controller
        name="office"
        control={control}
        rules={{ required: `Please select an office` }}
        render={({ field }) => (
          <SelectOfficeModal
            onChange={setOfficeSearchText}
            searchText={officeSearchText}
            show={showModal}
            offices={offices}
            close={handleClose}
            selectOffice={field.onChange}
          />
        )}
      />
    </div>
  )
}
