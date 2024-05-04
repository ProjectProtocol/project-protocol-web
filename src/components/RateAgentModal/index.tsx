import { Alert, Button, FormControl } from 'react-bootstrap'
import Agent from '../../types/Agent'
import AgentInfo from '../AgentInfo'
import { IRateAgentFormState } from './form-types'
import RateAgentRatingRadio from './RateAgentRatingRadio'
import { SubmitHandler, useForm } from 'react-hook-form'
import RateAgentTags from './RateAgentTags'
import toast from 'react-hot-toast'
import { isEmpty } from 'lodash-es'
import PopUp from '../PopUp'
import AsyncButton from '../AsyncButton'
import { useTranslate } from '@tolgee/react'

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
  const { t } = useTranslate(['rate_agent', 'shared'])
  const hasErrors = !isEmpty(errors)

  const onError = () => {
    toast.error(t('error'))
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
      title={t('title')}
      show={show}
      fullscreen="sm-down"
      onHide={onHide}
      bodyClass="pb-5 px-4"
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
        <div className="mb-5">
          <h4>
            {t('additionalComments') + ' ' + t('optional', { ns: 'shared' })}
          </h4>
          <p>{t('additionalCommentsHelpText')}</p>
          <FormControl
            as="textarea"
            placeholder={t('additionalCommentsPlaceholder')}
            rows={2}
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
          <AsyncButton loading={isSubmitting} size="lg" type="submit">
            {t('submit')}
          </AsyncButton>
          <Button size="lg" onClick={onHide} variant="link link-danger">
            {t('cancel', { ns: 'shared' })}
          </Button>
        </div>
      </form>
    </PopUp>
  )
}
