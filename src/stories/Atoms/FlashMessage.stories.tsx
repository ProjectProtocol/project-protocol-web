import type { Meta, StoryObj } from '@storybook/react'

import Alert from 'react-bootstrap/Alert'

/** This is the `react-bootstrap/Card` component, just demo'd here to show the bootstrap style overrides. */
const meta: Meta<typeof Alert> = {
  tags: ['autodocs'],
  title: 'Atoms/Alert',
  component: Alert,
}

export default meta
type Story = StoryObj<typeof Alert>

export const Basic: Story = {
  render: () => <Alert>Wow</Alert>,
}
