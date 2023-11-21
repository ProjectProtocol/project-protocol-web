import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import RatingRadio from '../RatingRadio'
import { IRateAgentFormState } from './form-types'

interface IRateAgentRatingRadio {
  control: Control<IRateAgentFormState>
  name: 'helpful' | 'caring' | 'availability' | 'respectful'
}
export default function RateAgentRatingRadio({
  control,
  name,
}: IRateAgentRatingRadio) {
  const { t } = useTranslation()
  const i18nKey = `ratings.category.${name}`

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: t('ratings.required', { name }) }}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          <RatingRadio
            currentValue={field.value}
            onChange={field.onChange}
            title={t(`${i18nKey}.title`)}
            titleHelper={t(`${i18nKey}.titleHelper`)}
            helperLeft={t(`${i18nKey}.helperLeft`)}
            helperRight={t(`${i18nKey}.helperRight`)}
            errorMessage={error?.message}
          />
        </div>
      )}
    />
  )
}
