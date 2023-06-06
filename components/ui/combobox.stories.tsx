import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Combobox } from "./combobox"

const meta: Meta<typeof Combobox> = {
  title: "UI/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Combobox>

const ComboboxWithState = ({
  placeholder,
  className,
}: {
  placeholder: string
  className?: string
}) => {
  const [value, setValue] = useState("")
  return (
    <Combobox
      placeholder={placeholder}
      value={value}
      onChange={(value) => setValue(value)}
      className={className}
    />
  )
}

export const Default: Story = {
  args: {
    placeholder: "Select something...",
  },
  render: ({ placeholder, className }) => (
    <ComboboxWithState placeholder={placeholder} className={className} />
  ),
}
