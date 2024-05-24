import { useEffect, useRef } from 'react'
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl'

export default function DynamicTextArea({
  onChange,
  value,
  ...props
}: FormControlProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return
    }

    textAreaRef.current.style.height = 'auto' // will not work without this!
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
  }

  useEffect(() => {
    resizeTextArea()
    window.addEventListener('resize', resizeTextArea)
    return () => window.removeEventListener('resize', resizeTextArea)
  }, [])

  useEffect(() => {
    if (value === '') {
      resizeTextArea()
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextArea()
    onChange?.(e)
  }

  return (
    <FormControl
      as="textarea"
      onChange={handleChange}
      value={value}
      ref={textAreaRef}
      {...props}
      rows={1}
    />
  )
}
