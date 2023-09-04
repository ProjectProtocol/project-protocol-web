import { UseFormRegister } from 'react-hook-form'
import {
  IRateAgentFormState,
  RatingFormInteger,
  RatingFormString,
  RatingFormText,
} from './form-types'
import { Button, FormControl } from 'react-bootstrap'
import TagBadge from '../TagBadge'

interface IRateAgentFormField {
  fieldConfig: RatingFormInteger | RatingFormString | RatingFormText
  register: UseFormRegister<IRateAgentFormState>
  currentValue?: string | number | string[]
}

export default function RateAgentFormField({
  fieldConfig,
  register,
  currentValue,
}: IRateAgentFormField) {
  const { name, required } = fieldConfig
  let typedConfig
  switch (fieldConfig.type) {
    case 'integer':
      typedConfig = fieldConfig as RatingFormInteger
      console.log(currentValue)
      return (
        <div className="mb-3">
          <h4>{typedConfig.ui.title}</h4>
          <p>{typedConfig.ui.titleHelper}</p>
          <div className="d-flex flex-row justify-content-between mb-2">
            {[1, 2, 3, 4, 5].map((n: number) => (
              <label key={`${name}-radio-${n}`} htmlFor={`${name}-${n}`}>
                <input
                  {...register(name, { required })}
                  type="radio"
                  value={n}
                  id={`${name}-${n}`}
                />
                <Button
                  className="text-white fw-bold"
                  variant={n == currentValue ? `rating-${n}` : 'tertiary'}
                  style={{ width: 50, height: 50 }}
                >
                  {n}
                </Button>
              </label>
            ))}
          </div>
          <div className="d-flex flex-row justify-content-between small">
            <span>{typedConfig.ui.helperLeft}</span>
            <span>{typedConfig.ui.helperRight}</span>
          </div>
        </div>
      )
    case 'text':
      typedConfig = fieldConfig as RatingFormText
      return (
        <FormControl
          as="textarea"
          {...register(typedConfig.name, { required: typedConfig.required })}
          placeholder={typedConfig.ui.placeholder}
        />
      )
    case 'string':
      typedConfig = fieldConfig as RatingFormString
      return (
        <>
          <h1>{typedConfig.name}</h1>
          <div>
            {Object.values(typedConfig.ui.values).map((v: string) => {
              return <TagBadge label={v} key={`form-tag-${v}`} />
            })}
          </div>
        </>
      )
    default:
      return <p>Undefined field type</p>
  }
}
