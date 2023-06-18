import type { Meta, StoryObj } from "@storybook/react"

import { TaskOptions } from "./task-options"

const meta: Meta<typeof TaskOptions> = {
  title: "Tasks/Task Options",
  component: TaskOptions,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof TaskOptions>

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
