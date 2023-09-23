import type { Meta, StoryObj } from '@storybook/react'
import StaticPage from 'src/components/StaticPage'
import officeIcon from '../images/office-icon.svg'
import proproIcon from '../images/icon.svg'

/** UI for showing general layout of static pages */
const meta: Meta<typeof StaticPage> = {
  title: 'Components/StaticPage',
  component: StaticPage,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-light">
        <Story />
      </div>
    )
  ]
}

export default meta

type Story = StoryObj<typeof StaticPage>

export const Basic: Story = {
  args: {
    title: 'Title of page',
    icon: officeIcon,
    children: (
      <div>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    )
  },
}

/**
 * Same but with a different icon.
*/
export const DifferentIcon: Story = {
  args: {
    ...Basic.args,
    icon: proproIcon,
 },
}
