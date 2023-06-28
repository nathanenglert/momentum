import type { Meta, StoryObj } from "@storybook/react"

import { LogOptions } from "./log-options"

const meta: Meta<typeof LogOptions> = {
  title: "Core/Log Options",
  component: LogOptions,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof LogOptions>

export const Default: Story = {
  args: {
    id: "1",
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}
