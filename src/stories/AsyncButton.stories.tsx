import { Meta, StoryObj } from '@storybook/react'
import AsyncButton, { IAsyncButton } from 'src/components/AsyncButton'

/** Sample async button that shows spinner on loading */
const meta: Meta<typeof AsyncButton> = {
  tags: ['autodocs'],
  title: 'Components/AsyncButton',
  component: AsyncButton,
}

export default meta

type Story = StoryObj<IAsyncButton>

export const Basic: Story = {
  args: {
    loading: false,
    children: 'Submit',
    size: 'lg',
    className: 'w-100',
    variant: 'primary',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Submit',
    size: 'lg',
    className: 'w-100',
    variant: 'primary',
  },
}
