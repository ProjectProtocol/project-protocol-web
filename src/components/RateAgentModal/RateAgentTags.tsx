import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IRateAgentFormState } from './form-types'
import { TagKey, tagsTranslationMap } from './rateAgentUiStrings'
import RateAgentTag from './RateAgentTag'

interface IRateAgentTags {
  control: Control<IRateAgentFormState>
}

export default function RateAgentTags({ control }: IRateAgentTags) {
  const { t } = useTranslation()

  const tagValues = Object.keys(tagsTranslationMap) as TagKey[]

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field }) => {
        const { value, onChange } = field

        //TODO: Assure form value compatibility with translations
        function handleClick(tagName: string) {
          value.indexOf(tagName) === -1
            ? onChange([...value, tagName])
            : onChange(value.filter((t) => t !== tagName))
        }

        return (
          <div className="mb-3 fs-4">
            <h4>
              {t('ratings.tags.title')} <small>(optional)</small>
            </h4>
            {tagValues.map((tagName: TagKey, i: number) => (
              <RateAgentTag
                key={`rating-tag-btn-${i}`}
                isActive={value.indexOf(tagName) > -1}
                tagName={t(tagsTranslationMap[tagName])}
                onClick={() => handleClick(tagName)}
              />
            ))}
          </div>
        )
      }}
    />
  )
}
