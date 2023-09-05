import { Button, FormControl, Modal } from 'react-bootstrap'
import Agent from '../../types/Agent'
import AgentInfo from '../AgentInfo'
import { IRateAgentFormState } from './form-types'
import RateAgentRatingRadio from './RateAgentRatingRadio'
import { useForm } from 'react-hook-form'
import RateAgentTags from './RateAgentTags'

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
  const { handleSubmit, control, register } = useForm<IRateAgentFormState>({
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

  const onSubmit = (data: IRateAgentFormState) => console.log(data)

  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      onHide={close}
      centered
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header className="border-0 px-4" closeButton>
          <Modal.Title>
            <h2 className="m-0 text-brand">Rate Agent</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4">
          <AgentInfo agent={agent} />
          <hr />
          <RateAgentRatingRadio control={control} name="helpful" required />
          <RateAgentRatingRadio control={control} name="caring" required />
          <RateAgentRatingRadio control={control} name="respectful" required />
          <RateAgentRatingRadio
            control={control}
            name="availability"
            required
          />
          <RateAgentTags control={control} />
          <h4>Additional Comments</h4>
          <FormControl
            as="textarea"
            placeholder="Leave a comment to elaborate on any of the above ratings"
            rows={5}
            {...register('review_input')}
          />
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
