import { FloatingLabel, FormControl, FormControlProps } from 'react-bootstrap'

interface IInput extends FormControlProps {
  error?: string
  type: 'text' | 'email' | 'password' | 'tel' | 'zip'
  label: string
  placeholder?: string
}

const Input: React.FC<IInput & FormControlProps> = ({
  error,
  type,
  label,
  placeholder,
  ...props
}: IInput) => {
  return (
    <FloatingLabel label={label}>
      <FormControl {...props} type={type} placeholder={placeholder || label} />
      <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
    </FloatingLabel>
  )
}

export default Input
