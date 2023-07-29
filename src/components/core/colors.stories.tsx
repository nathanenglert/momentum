import type { Meta, StoryObj } from "@storybook/react"

import { cn } from "@/lib/utils"

const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1))

const SwatchPalette = ({
  background,
  foreground,
  theme,
  title,
  subTheme,
}: {
  background: string
  foreground: string
  title: string
  theme: string
  subTheme?: string
}) => {
  const rowName = !!subTheme
    ? toTitleCase(subTheme)
    : !!theme
    ? "Dark"
    : "Light"

  return (
    <div
      className={cn(
        "bg-background p-4 grid grid-cols-7 items-center",
        subTheme
      )}
    >
      <div className={cn("text-muted-foreground", { "pl-4": !!subTheme })}>
        {rowName}
      </div>
      {[`bg-${background}`, ""].map((background) => (
        <div className={cn("px-4 py-2 col-span-3", background)}>
          <h1 className={`text-xl font-bold text-${foreground}foreground`}>
            {title}
          </h1>
          <p className={`text-${foreground}foreground`}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      ))}
    </div>
  )
}

const Swatch = ({ color }: { color: string }) => {
  const title = !!color ? toTitleCase(color) : "Default"
  const foreground = !!color ? color + "-" : ""
  const background = !!color ? color : "background"

  return (
    <div>
      <div className="p-4 grid grid-cols-7 items-center">
        <div></div>
        <div className="col-span-3 text-center text-muted-foreground">
          Background
        </div>
        <div className="col-span-3 text-center text-muted-foreground">
          No Background
        </div>
      </div>
      {["", "dark"].map((theme) => (
        <div className={theme}>
          <SwatchPalette
            background={background}
            foreground={foreground}
            theme={theme}
            title={title}
          />
          {color === "accent" &&
            ["task", "note", "meter", "metric"].map((logType) => (
              <SwatchPalette
                subTheme={logType}
                background={background}
                foreground={foreground}
                theme={theme}
                title={title}
              />
            ))}
        </div>
      ))}
    </div>
  )
}

const meta: Meta<typeof Swatch> = {
  title: "Core/Colors",
  component: Swatch,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Swatch>

export const Default: Story = { args: { color: "" } }
export const Primary: Story = { args: { color: "primary" } }
export const Secondary: Story = { args: { color: "secondary" } }
export const Accent: Story = { args: { color: "accent" } }
export const Muted: Story = { args: { color: "muted" } }
export const Destructive: Story = { args: { color: "destructive" } }
export const Warning: Story = { args: { color: "warning" } }
export const Popover: Story = { args: { color: "popover" } }
export const Card: Story = { args: { color: "card" } }
