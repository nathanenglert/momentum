import { composeStories } from "@storybook/testing-react"
import { render, screen } from "@testing-library/react"

import * as stories from "./button.stories"

const { Default, Destructive, Ghost, Link, Outline, Secondary } =
  composeStories(stories)

test("renders default button", () => {
  render(<Default />)
  const buttonElement = screen.getByText(/Button/i)
  expect(buttonElement).not.toBeNull()
})

test("renders default button with override props", () => {
  render(<Default>Hello world</Default>)
  const buttonElement = screen.getByText(/Hello world/i)
  expect(buttonElement).not.toBeNull()
})
//
;[
  [`destructive`, Destructive],
  [`ghost`, Ghost],
  [`link`, Link],
  [`outline`, Outline],
  [`secondary`, Secondary],
].map(([name, component]) => {
  test(`renders ${name} button`, () => {
    const Component = component
    render(<Component>{name as string}</Component>)
    const buttonElement = screen.getByText(name as string)
    expect(buttonElement).not.toBeNull()
  })
})
