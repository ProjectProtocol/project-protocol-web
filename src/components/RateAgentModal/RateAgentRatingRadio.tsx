import { Control, Controller } from 'react-hook-form'
import RatingRadio from '../RatingRadio'
import * as rateAgentUiStrings from './rateAgentUiStrings'
import { IRateAgentFormState } from './form-types'

interface IRateAgentRatingRadio {
  control: Control<IRateAgentFormState>
  name: 'helpful' | 'caring' | 'availability' | 'respectful'
}
export default function RateAgentRatingRadio({
  control,
  name,
}: IRateAgentRatingRadio) {
  const { title, titleHelper, helperLeft, helperRight } =
    rateAgentUiStrings[name]
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `Please provide a '${title}' rating` }}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          <RatingRadio
            currentValue={field.value}
            onChange={field.onChange}
            title={title}
            titleHelper={titleHelper}
            helperLeft={helperLeft}
            helperRight={helperRight}
            errorMessage={error?.message}
          />
        </div>
      )}
    />
  )
}
