import {
  ChangeHandler,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form'
import RatingRadioButton from './RatingRadioButton'
import { IRateAgentFormState } from '../RateAgentModal/form-types'

interface IRatingRadio {
  title: string
  /** Brief description of this rating category. */
  titleHelper: string
  /** Description for lowest rating */
  helperLeft: string
  /** Description for highest rating */
  helperRight: string
  register: UseFormRegister<IRateAgentFormState>
  currentValue: number
  /** Optionally customize the container with css classes */
  containerClass?: string
}

/**
 * Form element allowing user to provide a 1-to-5 rating.
 * Ratings are color coded.
 * */
export default function RatingRadio({
  title,
  helperLeft,
  helperRight,
  titleHelper,
  containerClass,
  register,
}: IRatingRadio) {
  return (
    <div className={containerClass}>
      <h4>{title}</h4>
      <p>{titleHelper}</p>
      <div className="d-flex flex-row justify-content-between mb-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={`${registerProps.name}-${n}`}
            htmlFor={`${registerProps.name}-${n}`}
          >
            <input
              {...registerProps}
              value={n}
              type="radio"
              className="d-none"
              key={[title, 'button', n].join('-')}
              id={`${title}-radion-${n}`}
            />
            <RatingRadioButton value={n} isActive={false} />
          </label>
        ))}
      </div>
      <div className="d-flex flex-row justify-content-between small">
        <span>{helperLeft}</span>
        <span>{helperRight}</span>
      </div>
    </div>
  )
}
