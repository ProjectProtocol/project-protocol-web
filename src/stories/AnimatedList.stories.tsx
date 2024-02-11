import type { Meta, StoryObj } from '@storybook/react'
import AnimatedList from 'src/components/AnimatedList'

const meta: Meta<typeof AnimatedList> = {
  title: 'Components/AnimatedList',
  component: AnimatedList,
  tags: ['autodocs'],
}

function generateChildren(key: string) {
  const color = (i: number) =>
    ['primary', 'secondary', 'meyer-lemon', 'loquat'][i % 4]
  return Array(7)
    .fill(0)
    .map((_, i: number) => (
      <div
        key={`${key}-${i}`}
        className={`my-3 border rounded p-3 w-50 text-center fw-semibold bg-${color(
          i,
        )}`}
      >
        <span>Item {i + 1}</span>
      </div>
    ))
}

export default meta
type Story = StoryObj<typeof AnimatedList>

/**
 * The default animation
 */
export const Basic: Story = {
  args: {
    children: generateChildren('basic'),
  },
}

/**
 * Set immediate to true to skip animation for items.
 */
export const Immediate: Story = {
  args: {
    children: generateChildren('immediate'),
    immediate: true,
  },
}

/**
 * Delay between item animations is 150ms by default but can be adjusted.
 */
export const SlowDelay: Story = {
  args: {
    children: generateChildren('slow'),
    delay: 500,
  },
}
