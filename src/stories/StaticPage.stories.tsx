import type { Meta, StoryObj } from '@storybook/react'
import StaticPage from 'src/components/StaticPage'

/** UI for showing general layout of static pages */
const meta: Meta<typeof StaticPage> = {
  title: 'Components/StaticPage',
  component: StaticPage,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StaticPage>

const staticPage = {
    title: 'Title of page',
    icon: 'src/images/icon.svg',
    children: []
}

export const Basic: Story = {
  args: {
    title: staticPage.title,
    icon: staticPage.icon,
    children: staticPage.children
 },
}
