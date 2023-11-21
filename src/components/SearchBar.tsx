import { FormControl, FormControlProps } from 'react-bootstrap'

interface ISearchBar extends FormControlProps {
  borderColor?:
    | 'info'
    | 'primary'
    | 'success'
    | 'danger'
    | 'secondary'
    | 'tertiary'
  name?: string
  className?: string
}

/** Thin wrapper around Bootstrap's FormControl for consistent SearchBar style */
export default function SearchBar({
  className,
  borderColor = 'primary',
  ...props
}: ISearchBar) {
  const classes = [
    className,
    `rounded-5 border border-${borderColor} border-3`,
  ].join(' ')

  return (
    <FormControl
      className={classes}
      autoComplete="false"
      type="text"
      {...props}
    />
  )
}
