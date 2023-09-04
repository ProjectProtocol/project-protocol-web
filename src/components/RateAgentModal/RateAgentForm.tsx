import { FormControl } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IRateAgentFormState } from './form-types'

interface IRateAgentForm {
  onSubmit: SubmitHandler<IRateAgentFormState>
}

export default function RateAgentForm({ onSubmit }: IRateAgentForm) {
  const { register, handleSubmit } = useForm<IRateAgentFormState>({
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl as="textarea" {...register('review_input')} />
    </form>
  )
}
