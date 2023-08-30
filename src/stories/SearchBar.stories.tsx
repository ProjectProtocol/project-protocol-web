import type { Meta, StoryObj } from '@storybook/react'
import SearchBar from 'src/components/SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const Basic: Story = {
  args: { placeholder: 'Search for agent or office' },
}
