import { Alert, Button, FormControl } from 'react-bootstrap'
import Agent from '../../types/Agent'
import AgentInfo from '../AgentInfo'
import { IRateAgentFormState } from './form-types'
import RateAgentRatingRadio from './RateAgentRatingRadio'
import { SubmitHandler, useForm } from 'react-hook-form'
import RateAgentTags from './RateAgentTags'
import toast from 'react-hot-toast'
import { isEmpty } from 'lodash'
import { reviewInput } from './rateAgentUiStrings'
import PopUp from '../PopUp'

interface IRateAgentModal {
  agent: Agent
  show: boolean
  close: (refresh?: boolean) => void
  onSubmit: SubmitHandler<IRateAgentFormState>
}

export default function RateAgentModal({
  agent,
  close,
  show,
  onSubmit,
}: IRateAgentModal) {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IRateAgentFormState>({
    mode: 'onSubmit',
    defaultValues: {
      helpful: undefined,
      caring: undefined,
      respectful: undefined,
      availability: undefined,
      tags: [],
      reviewInput: '',
    },
  })

  const hasErrors = !isEmpty(errors)

  const onError = () => {
    toast.error('Please fix errors before proceeding')
  }

  const onHide = () => {
    reset()
    close()
  }

  const onSubmitWrapper = async (data: IRateAgentFormState) => {
    await onSubmit(data)
    reset()
  }

  return (
    <PopUp
      title="Rate agent"
      show={show}
      fullscreen="sm-down"
      onHide={onHide}
      closeButton
      centered={false}
    >
      <form onSubmit={handleSubmit(onSubmitWrapper, onError)}>
        <AgentInfo agent={agent} />
        <hr />
        <RateAgentRatingRadio control={control} name="helpful" />
        <RateAgentRatingRadio control={control} name="caring" />
        <RateAgentRatingRadio control={control} name="respectful" />
        <RateAgentRatingRadio control={control} name="availability" />
        <RateAgentTags control={control} />
        <div className="mb-3">
          <h4>
            {reviewInput.title}
            <small>(optional)</small>
          </h4>
          <FormControl
            as="textarea"
            placeholder={reviewInput.placeholder}
            rows={5}
            {...register('reviewInput')}
          />
        </div>
        <div className="d-block">
          {hasErrors &&
            Object.values(errors).map(({ message }, i) => (
              <Alert variant="danger" key={`rate-agent-error-${i}`}>
                {message}
              </Alert>
            ))}
        </div>
        <div className="d-block">
          {hasErrors &&
            Object.values(errors).map(({ message }, i) => (
              <Alert variant="danger" key={`rate-agent-error-${i}`}>
                {message}
              </Alert>
            ))}
        </div>
        <div className="d-grid gap-3">
          <Button size="lg" disabled={isSubmitting} type="submit">
            Submit
          </Button>
          <Button size="lg" onClick={onHide} variant="tertiary">
            Close
          </Button>
        </div>
      </form>
    </PopUp>
  )
}
