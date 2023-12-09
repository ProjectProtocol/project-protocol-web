import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IRateAgentFormState } from './form-types'
import RateAgentTag from './RateAgentTag'
import { tagsTranslationMap, TagKey } from 'src/types/Tag'

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

        function handleClick(tagName: string) {
          value.includes(tagName)
            ? onChange(value.filter((t) => t !== tagName))
            : onChange([...value, tagName])
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
