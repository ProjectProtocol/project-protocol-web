import type { Meta, StoryObj } from '@storybook/react'

import SearchResult from 'src/components/SearchResult'

/** Card UI for showing either an agent or an office */
const meta: Meta<typeof SearchResult> = {
  tags: ['autodocs'],
  title: 'Components/SearchResult',
  component: SearchResult,
}

export default meta
type Story = StoryObj<typeof SearchResult>

export const Agent: Story = {
  args: {
    result: {
      firstName: 'Bob',
      lastName: 'Ross',
      fullName: 'Bob Ross',
      office: {
        id: 123,
        street: '123 Avenida Alipaz',
        city: 'Alhambra',
        state: 'CA',
        zip: '91789',
        type: 'Office',
      },
      type: 'Agent',
      id: 400,
      averageRating: 3.5,
    },
  },
}

export const Office: Story = {
  args: {
    result: {
      id: 123,
      street: '123 Avenida Alipaz',
      city: 'Alhambra',
      state: 'CA',
      zip: '91789',
      type: 'Office',
    },
  },
}

export const OnClick: Story = {
  args: {
    result: {
      id: 123,
      street: '123 Avenida Alipaz',
      city: 'Alhambra',
      state: 'CA',
      zip: '91789',
      type: 'Office',
    },
    onClick: () => alert('Click!'),
  },
}
