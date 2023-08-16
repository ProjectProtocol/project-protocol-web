import type { Meta, StoryObj } from "@storybook/react"

import ReviewCard from "../components/ReviewCard"

const meta: Meta<typeof ReviewCard> = {
  title: "Atoms/ReviewCard",
  component: ReviewCard,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ReviewCard>

export const Basic: Story = {
  args: {},
}
