import type { Meta, StoryObj } from "@storybook/react"

import Card from "react-bootstrap/Card"

/** This is the `react-bootstrap/Card` component, just demo'd here to show the bootstrap style overrides. */
const meta: Meta<typeof Card> = {
  tags: ["autodocs"],
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

/** With the shadow class */
export const Shadow: Story = {
  render: () => (
    <Card body style={{ maxWidth: 450 }} className="shadow">
      <h3 className="m-0">Office Name</h3>
      <h3 className="text-secondary m-0">Office</h3>
      <p className="m-0">Address Line One</p>
      <p className="m-0">Address Line Two</p>
    </Card>
  ),
}
