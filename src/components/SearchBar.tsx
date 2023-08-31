import { FormControl, FormControlProps } from 'react-bootstrap'

interface ISearchBar extends FormControlProps {
  borderColor?: 'info' | 'primary' | 'success' | 'danger' | 'secondary'
}

/** Thin wrapper around Bootstrap's FormControl for consistent SearchBar style */
export default function SearchBar({
  className,
  borderColor,
  ...props
}: ISearchBar) {
  const classes = [
    className,
    `rounded-5 border border-${borderColor || 'info'} border-3`,
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
