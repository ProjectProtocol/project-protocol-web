import { Button, FormControl, Modal, Spinner } from 'react-bootstrap'
import Agent from '../../types/Agent'
import AgentInfo from '../AgentInfo'
import { useEffect, useState } from 'react'
import apiClient from 'src/api/client'
import {
  IRateAgentFormState,
  RatingFormInteger,
  RatingFormString,
  RatingFormText,
} from './form-types'
import { useForm } from 'react-hook-form'
import RateAgentFormField from './RateAgentFormField'

interface IRateAgentModal {
  agent: Agent
  show: boolean
  close: () => void
}

type FieldConfig = RatingFormInteger | RatingFormString | RatingFormText

export default function RateAgentModal({
  agent,
  close,
  show,
}: IRateAgentModal) {
  const [fields, setFields] = useState<FieldConfig[]>()
  const { register, handleSubmit, watch, control } =
    useForm<IRateAgentFormState>({
      mode: 'onBlur',
      defaultValues: {
        helpful: undefined,
        caring: undefined,
        respectful: undefined,
        availability: undefined,
        tags: [],
        review_input: '',
      },
    })

  const helpful = watch('helpful')
  console.log(helpful)

  useEffect(() => {
    if (!fields) {
      apiClient
        .get('/ui_configurations/review_form')
        .then(({ data }) => setFields(data))
    }
  }, [fields])

  const onSubmit = (data: IRateAgentFormState) => console.log(data)

  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      onHide={close}
      centered
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>
            <h2 className="m-0 text-brand">Rate Agent</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AgentInfo agent={agent} />
          <hr />
          {fields &&
            fields.map(
              (
                field: RatingFormInteger | RatingFormString | RatingFormText,
                i: number,
              ) => (
                <RateAgentFormField
                  currentValue={watch(field.name)}
                  register={register}
                  fieldConfig={field}
                  key={`weirdness-${i}`}
                />
              ),
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} variant="tertiary">
            Close
          </Button>
          <Button type="submit">Submit</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
