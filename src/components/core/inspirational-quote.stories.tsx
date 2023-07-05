import type { Meta, StoryObj } from "@storybook/react"

import { InspirationalQuote } from "./inspirational-quote"

const meta: Meta<typeof InspirationalQuote> = {
  title: "Core/Inspirational Quote",
  component: InspirationalQuote,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof InspirationalQuote>

export const Default: Story = {
  args: {
    dict: [
      {
        message:
          "The best way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
      },
      {
        message:
          "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
        author: "Winston Churchill",
      },
      {
        message: "Don't let yesterday take up too much of today.",
        author: "Will Rogers",
      },
    ],
  },
}
