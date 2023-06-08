import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: `Button`,
  },
}

export const Destructive: Story = {
  args: {
    children: `Button`,
    variant: `destructive`,
  },
}

export const Ghost: Story = {
  args: {
    children: `Button`,
    variant: `ghost`,
  },
}

export const Link: Story = {
  args: {
    children: `Button`,
    variant: `link`,
  },
}

export const Outline: Story = {
  args: {
    children: `Button`,
    variant: `outline`,
  },
}

export const Secondary: Story = {
  args: {
    children: `Button`,
    variant: `secondary`,
  },
}
