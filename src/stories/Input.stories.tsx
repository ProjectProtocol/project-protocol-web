import type { Meta, StoryObj } from '@storybook/react'
import Input from 'src/components/Input'

/**
 * A convenience wrapper around the floating label style form control with validation styles and error message
 * rendering.  Component is stateless and is designed to work with react-hook-form or as a standalone form
 * input.
 */
const meta: Meta<typeof Input> = {
  tags: ['autodocs'],
  title: 'Forms/Input',
  component: Input,
}
export default meta
type Story = StoryObj<typeof Input>

export const Basic: Story = {
  args: {
    label: 'Email',
    type: 'email',
    isInvalid: false,
    isValid: false,
    error: '',
    value: '',
  },
}

/**  Valid styles (when `isValid` is true) */
export const Valid: Story = {
  args: {
    ...Basic.args,
    isValid: true,
    value: 'tim@projectprotocol.org',
  },
}

/**  When `isInvalid` is true */
export const Invalid: Story = {
  args: {
    ...Basic.args,
    isInvalid: true,
    value: 'bademail',
  },
}

/**
 * Error message is rendered below the input if the `error` prop is not empty and `isInvalid` is set to true.
 */
export const Error: Story = {
  args: {
    ...Basic.args,
    value: 'wrong@dot',
    isInvalid: true,
    error: 'Errors only show when invalid is set to true',
  },
}
