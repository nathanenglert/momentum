import { Meta, StoryObj } from "@storybook/react"
import { Info } from "lucide-react"

import { MetricDisplay } from "./metric-display"

const meta: Meta<typeof MetricDisplay> = {
  title: "Charts/Metric Display",
  component: MetricDisplay,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof MetricDisplay>

export const Default: Story = {
  args: {
    name: "A Metric",
    value: 100,
  },
}

export const WithIcon: Story = {
  args: {
    name: "A Metric",
    value: 100,
    icon: Info,
  },
}

export const WithPrevious: Story = {
  args: {
    name: "A Metric",
    value: 100,
    previous: 50,
  },
}
