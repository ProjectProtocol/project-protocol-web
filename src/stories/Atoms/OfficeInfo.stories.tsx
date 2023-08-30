import type { Meta, StoryObj } from '@storybook/react'
import OfficeInfo from 'src/components/OfficeInfo'
import Office from 'src/types/Office'

const meta: Meta<typeof OfficeInfo> = {
  title: 'Atoms/OfficeInfo',
  component: OfficeInfo,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OfficeInfo>

const o: Office = {
  id: 8,
  street: '57526 Tonja Motorway',
  city: 'Oakland',
  state: 'CA',
  zip: '62473-7351',
  type: 'Office',
}

export const Basic: Story = {
  args: {
    office: o,
  },
}
