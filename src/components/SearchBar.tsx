import { FormControl, FormControlProps } from 'react-bootstrap'

/** Thin wrapper around Bootstrap's FormControl for consistent SearchBar style */
export default function SearchBar({ className, ...props }: FormControlProps) {
  const classes = ['rounded-5 border border-info border-3', className].join(' ')

  return (
    <FormControl
      className={classes}
      autoComplete="false"
      type="text"
      {...props}
    />
  )
}
