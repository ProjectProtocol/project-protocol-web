import type { Meta, StoryObj } from '@storybook/react'
import AgentInfo from 'src/components/AgentInfo'
import Agent from 'src/types/Agent'

const meta: Meta<typeof AgentInfo> = {
  title: 'Components/AgentInfo',
  component: AgentInfo,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AgentInfo>

const a: Agent = {
  id: '69',
  averageRating: 3.5,
  firstName: 'Julieann',
  lastName: 'Murphy',
  fullName: 'Julieann Murphy',
  office: {
    id: 8,
    street: '57526 Tonja Motorway',
    city: 'Oakland',
    state: 'CA',
    zip: '62473-7351',
    type: 'Office',
  },
  type: 'Agent',
}

export const Basic: Story = {
  args: {
    agent: a,
  },
}
