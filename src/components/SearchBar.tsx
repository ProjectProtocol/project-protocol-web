import { ChangeEvent, useState } from 'react'
import { FormControl, FormControlProps } from 'react-bootstrap'
import bootstrapVariables from 'src/util/bootstrapVariables'

interface ISearchBar extends FormControlProps {
  className?: string
}

/** Thin wrapper around Bootstrap's FormControl for consistent SearchBar style */
export default function SearchBar({
  className,
  children,
  onChange,
  ...props
}: ISearchBar) {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')
  const isBlank = value === ''
  const Icon = isBlank ? SearchIcon : CloseIcon
  const borderColor = isFocused ? 'primary' : 'loquat'

  const classes = [
    className,
    `rounded-5 outline-none border focus-ring focus-ring-transparent text-dark border-${borderColor} border-3 py-2 px-3 pe-5`,
  ].join(' ')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange && onChange(e)
  }

  return (
    <div className="position-relative">
      <FormControl
        className={classes}
        autoComplete="false"
        type="text"
        value={value}
        onChange={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <div
        className="h-100 position-absolute d-flex align-items-center"
        style={{ right: '17px', top: 0 }}
        role={isBlank ? '' : 'button'}
        onClick={() => !isBlank && setValue('')}
      >
        <Icon fill={bootstrapVariables[borderColor]} />
      </div>
    </div>
  )
}

/** Component wrappers around SVG icons for changing fill color to match the border */
function CloseIcon({ fill }: { fill: string }) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Close">
        <path
          id="Path 787"
          d="M13.2769 11.2208L18.7215 5.77481C18.986 5.51022 19.1347 5.15132 19.1347 4.77713C19.1347 4.40295 18.986 4.04404 18.7215 3.77945C18.457 3.51487 18.0983 3.36621 17.7242 3.36621C17.3501 3.36621 16.9914 3.51487 16.7268 3.77945L11.2822 9.22437L5.83759 3.77945C5.57307 3.51487 5.21433 3.36621 4.84024 3.36621C4.46616 3.36621 4.10741 3.51487 3.8429 3.77945C3.57838 4.04404 3.42976 4.40295 3.42976 4.77713C3.42976 5.15132 3.57838 5.51022 3.8429 5.77481L9.28638 11.2208L3.8429 16.6669C3.57838 16.9314 3.42976 17.2901 3.42976 17.6643C3.42976 18.0384 3.57838 18.3974 3.8429 18.6619C4.10741 18.9265 4.46616 19.0752 4.84024 19.0752C5.21433 19.0752 5.57307 18.9265 5.83759 18.6619L11.2822 13.2159L16.7268 18.6619C16.9914 18.9265 17.3501 19.0752 17.7242 19.0752C18.0983 19.0752 18.457 18.9265 18.7215 18.6619C18.986 18.3974 19.1347 18.0384 19.1347 17.6643C19.1347 17.2901 18.986 16.9314 18.7215 16.6669L13.2769 11.2208Z"
          fill={fill}
        />
      </g>
    </svg>
  )
}

function SearchIcon({ fill }: { fill: string }) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Search">
        <path
          id="Path 786"
          d="M22.0795 19.8562L17.7524 15.5303C19.1996 13.5402 19.8433 11.0776 19.5552 8.63384C19.267 6.19007 18.0682 3.94492 16.1977 2.34599C14.3273 0.747073 11.9228 -0.0881246 9.46397 0.00737169C7.00512 0.102868 4.67265 1.12196 2.93186 2.86113C1.19108 4.6003 0.16995 6.93167 0.0721814 9.39043C-0.0255874 11.8492 0.807204 14.2546 2.4044 16.1265C4.00159 17.9984 6.24581 19.1994 8.68931 19.4898C11.1328 19.7802 13.596 19.1388 15.5875 17.6934L19.8584 21.9644C19.9969 22.1102 20.1626 22.2274 20.3463 22.3091C20.53 22.3909 20.728 22.4357 20.929 22.441C21.13 22.4462 21.33 22.4117 21.5178 22.3396C21.7055 22.2676 21.8771 22.1592 22.0229 22.0208C22.1688 21.8824 22.2859 21.7167 22.3677 21.533C22.4494 21.3493 22.4943 21.1512 22.4995 20.9502C22.5047 20.7493 22.4703 20.5493 22.3982 20.3616C22.3262 20.1739 22.2179 20.0021 22.0795 19.8562ZM16.5564 9.78545C16.5564 11.1133 16.1627 12.4113 15.425 13.5154C14.6873 14.6195 13.6388 15.4799 12.412 15.9881C11.1853 16.4963 9.8353 16.6294 8.53294 16.3704C7.23058 16.1114 6.03427 15.4721 5.09526 14.5333C4.15625 13.5944 3.51672 12.3981 3.25755 11.0958C2.99837 9.79343 3.13119 8.44344 3.6392 7.2166C4.14721 5.98976 5.00763 4.94128 6.11161 4.20342C7.21559 3.46555 8.51355 3.07153 9.84141 3.07134C11.6214 3.07345 13.3279 3.78143 14.5866 5.04009C15.8453 6.29875 16.5534 8.00543 16.5555 9.78545H16.5564Z"
          fill={fill}
        />
      </g>
    </svg>
  )
}
