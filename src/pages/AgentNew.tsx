import { useNavigate, Link, Navigate } from 'react-router-dom'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import officerIcon from '../images/officer-icon.svg'
import SelectOfficeModal from 'src/components/SelectOfficeModal'
import { useEffect, useState } from 'react'
import Office from 'src/types/Office'
import { ApiAgent, ApiSearch } from 'src/api'
import { debounce } from 'lodash'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import SearchResult from 'src/components/SearchResult'
import toast from 'react-hot-toast'
import { useAuth } from 'src/contexts/auth/AuthContext'

interface IAddAnAgentForm {
  firstName: string
  lastName: string
  office: Office
}

export default function AgentNew() {
  const navigate = useNavigate()
  const { user } = useAuth()
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
    setOffices([])
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
      toast.error(t('error.generic'))
    }
  }

  const { t } = useTranslation()
  useEffect(() => {
    const handleSearchInput = debounce(getOffices, 500)

    if (officeSearchText !== '') {
      handleSearchInput(officeSearchText)
    }

    return () => handleSearchInput.cancel()
  }, [officeSearchText])

  return !user || user.isConfirmed ? (
    <Navigate to="/" />
  ) : (
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
          <img src={officerIcon} alt={t('agent.officerIconAlt')} width="50%" />
        </div>
      </div>
      <div className="p-4 text-start">
        <h2 className="mb-2">{t('agent.addAgent')}</h2>
        <p className="mb-5">{t('agent.formIntro')}</p>
        <h3 className="mb-3">{t('agent.form.title')}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <FloatingLabel
              label={t('agent.form.firstName')}
              className="mb-3 w-100"
            >
              <Form.Control
                type="text"
                placeholder={t('agent.form.firstName')}
                isInvalid={!!errors?.firstName}
                {...register('firstName', {
                  required: t('agent.form.firstNameRequired'),
                })}
              />
              {!!errors?.firstName && (
                <small className="text-danger">
                  {errors?.firstName?.message}
                </small>
              )}
            </FloatingLabel>
          </Form.Group>
          <FloatingLabel
            label={t('agent.form.lastName')}
            className="mb-3 w-100"
          >
            <Form.Control
              type="text"
              placeholder={t('agent.form.lastName')}
              isInvalid={!!errors?.lastName}
              {...register('lastName', {
                required: t('agent.form.lastNameRequired'),
              })}
            />
            {!!errors?.lastName && (
              <small className="text-danger">{errors?.lastName?.message}</small>
            )}
          </FloatingLabel>
          <div className="mb-3">
            <h3 className="mb-0"> {t('agent.form.office')}</h3>
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
                    {t('agent.form.edit')}
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
                  {t('agent.form.selectOffice')}
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
            {t('agent.form.createListing')}
          </Button>
        </form>
      </div>
      <Controller
        name="office"
        control={control}
        rules={{ required: t('agent.form.selectOfficeRequired') }}
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
