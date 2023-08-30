import type { Meta, StoryObj } from '@storybook/react'
import TagBadge from 'src/components/TagBadge'

const meta: Meta<typeof TagBadge> = {
  title: 'Atoms/TagBadge',
  component: TagBadge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TagBadge>

/** Default styles used for displaying review tags */
export const Basic: Story = {
  args: { label: 'Works around my schedule' },
}

/** Accepts override props for customization, for available props see https://react-bootstrap.netlify.app/docs/components/badge/ */
export const Overrides: Story = {
  args: {
    label: 'Customized badge',
    bg: 'primary',
    className: 'p-3 fs-4',
  },
}
