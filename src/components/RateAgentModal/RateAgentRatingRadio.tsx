import { Control, Controller } from 'react-hook-form'
import RatingRadio from '../RatingRadio'
import * as rateAgentUiStrings from './rateAgentUiStrings'
import { IRateAgentFormState } from './form-types'

interface IRateAgentRatingRadio {
  control: Control<IRateAgentFormState>
  name: 'helpful' | 'caring' | 'availability' | 'respectful'
  required: boolean
}
export default function RateAgentRatingRadio({
  control,
  name,
  required = true,
}: IRateAgentRatingRadio) {
  const { title, titleHelper, helperLeft, helperRight } =
    rateAgentUiStrings[name]
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <div className="mb-3">
          <RatingRadio
            currentValue={field.value}
            onChange={field.onChange}
            title={title}
            titleHelper={titleHelper}
            helperLeft={helperLeft}
            helperRight={helperRight}
          />
        </div>
      )}
    />
  )
}
