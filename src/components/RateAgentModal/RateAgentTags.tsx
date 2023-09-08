import { Control, Controller } from 'react-hook-form'
import { IRateAgentFormState } from './form-types'
import { tags } from './rateAgentUiStrings'
import RateAgentTag from './RateAgentTag'

interface IRateAgentTags {
  control: Control<IRateAgentFormState>
}

export default function RateAgentTags({ control }: IRateAgentTags) {
  const { title, values } = tags
  const tagValues = Object.keys(values)

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field }) => {
        const { value, onChange } = field

        function handleClick(tagName: string) {
          value.indexOf(tagName) === -1
            ? onChange([...value, tagName])
            : onChange(value.filter((t) => t !== tagName))
        }

        return (
          <div className="mb-3 fs-4">
            <h4>
              {title} <small>(optional)</small>
            </h4>
            {tagValues.map((t: string, i: number) => (
              <RateAgentTag
                key={`rating-tag-btn-${i}`}
                isActive={value.indexOf(t) > -1}
                tagName={t}
                onClick={() => handleClick(t)}
              />
            ))}
          </div>
        )
      }}
    />
  )
}
