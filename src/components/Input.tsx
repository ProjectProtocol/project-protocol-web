import { kebabCase } from 'lodash'
import { FloatingLabel, FormControl, FormControlProps } from 'react-bootstrap'

interface IInput extends FormControlProps {
  name?: string
  error?: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'zip'
  label: string
}

const Input: React.FC<IInput & FormControlProps> = ({
  error,
  type = 'text',
  label,
  ...props
}: IInput) => {
  const id = kebabCase(label)
  return (
    <FloatingLabel label={label} controlId={id}>
      <FormControl {...props} type={type} placeholder={label} />
      <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
    </FloatingLabel>
  )
}

export default Input
