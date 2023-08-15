import type { Meta, StoryObj } from "@storybook/react"

import Card from "react-bootstrap/Card"

const meta: Meta<typeof Card> = {
  title: "Atoms/Card",
  component: Card,
}

export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  render: () => (
    <Card body style={{ maxWidth: 450 }}>
      <h3 className="m-0">Office Name</h3>
      <h3 className="text-secondary m-0">Office</h3>
      <p className="m-0">Address Line One</p>
      <p className="m-0">Address Line Two</p>
    </Card>
  ),
}
