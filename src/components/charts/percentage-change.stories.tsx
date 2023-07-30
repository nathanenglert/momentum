import type { Meta, StoryObj } from "@storybook/react"

import { PercentageChange } from "./percentage-change"

const meta: Meta<typeof PercentageChange> = {
  title: "Charts/Percentage Change",
  component: PercentageChange,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof PercentageChange>

export const PositiveChange: Story = {
  args: {
    current: 100,
    previous: 50,
  },
}

export const NoChange: Story = {
  args: {
    current: 100,
    previous: 100,
  },
}

export const NegativeChange: Story = {
  args: {
    current: 50,
    previous: 100,
  },
}
