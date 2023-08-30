import type { Meta, StoryObj } from '@storybook/react'
import SearchBar from 'src/components/SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Atoms/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const Basic: Story = {
  args: { placeholder: 'Search for agent or office' },
}

/** Accepts override props for customization */
export const Overrides: Story = {
  args: {
    className: 'p-3 fs-4 border-danger',
    placeholder: 'Search something else',
  },
}
