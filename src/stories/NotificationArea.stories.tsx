import type { Meta, StoryObj } from '@storybook/react'

import NotificationArea from '../components/NotificationArea'
import { Button } from 'react-bootstrap'
import toast from 'react-hot-toast'

/**
 * There should only ever be one NotificationArea in the dom. This story
 * is mostly just an example of how to create toast messages.
 *
 * Generally, they will be used to show success or failure of some action
 * taken by the user, based on the response from the API.
 */
const meta: Meta<typeof NotificationArea> = {
  tags: ['autodocs'],
  title: 'Components/NotificationArea',
  component: NotificationArea,
}

export default meta
type Story = StoryObj<typeof NotificationArea>

export const Basic: Story = {
  render: () => (
    <div style={{ height: '500px' }}>
      <NotificationArea />
      <Button
        variant="success"
        className="me-3"
        onClick={() => toast.success('Success message')}
      >
        <pre className="m-0">toast.success()</pre>
      </Button>
      <Button
        variant="danger"
        className="d-inline"
        onClick={() => toast.error('Something went wrong. Please try again.')}
      >
        <pre className="m-0">toast.error()</pre>
      </Button>
    </div>
  ),
}
