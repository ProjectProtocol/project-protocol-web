import { ChangeEvent, useState } from 'react'
import { FormControl, FormControlProps } from 'react-bootstrap'
import bootstrapVariables, { ThemeColor } from 'src/util/bootstrapVariables'
import SearchIcon from './SearchIcon'
import CloseIcon from './CloseIcon'
import { kebabCase } from 'lodash-es'

interface ISearchBar extends FormControlProps {
  className?: string
  name: string
  /** Optional callback for when 'X' is clicked to clear the search bar. */
  onClear?: () => void
  activeColor?: ThemeColor
  inactiveColor?: ThemeColor
}

/**
 * Adds active/inactive border styles (primary/tangerine when focused, loquat when blurred). Icons provide feedback and match the current border color.
 * "Close" icon shows with clear functionality if the input is not empty.
 */
export default function SearchBar({
  className,
  onChange,
  onClear,
  defaultValue,
  activeColor = 'primary',
  inactiveColor = 'loquat',
  ...props
}: ISearchBar) {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState(defaultValue || '')
  const isBlank = value === ''

  const Icon = isBlank ? SearchIcon : CloseIcon
  const borderColor = isFocused ? activeColor : inactiveColor

  const classes = [
    className,
    `rounded-5 custom-outline-${kebabCase(
      borderColor,
    )} box-shadow-none border text-dark border-${kebabCase(
      borderColor,
    )} border-3 py-2 px-3 pe-5`,
  ].join(' ')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange && onChange(e)
  }

  const clear = () => {
    setValue('')
    onClear && onClear()
  }

  return (
    <div className="position-relative">
      <FormControl
        className={classes}
        autoComplete="false"
        type="text"
        role="searchbox"
        value={value as string}
        onChange={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <div
        className="h-100 position-absolute d-flex align-items-center"
        style={{ right: '17px', top: 0 }}
        role={isBlank ? '' : 'button'}
        onClick={() => !isBlank && clear()}
      >
        <Icon fill={bootstrapVariables[borderColor]} />
      </div>
    </div>
  )
}
