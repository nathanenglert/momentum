import { composeStories } from "@storybook/testing-react"
import { render, screen } from "@testing-library/react"

import * as stories from "./task.stories"

const { Default, HasDueDate, HasTag, HasDueDateInPast, HasAged } =
  composeStories(stories)

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("<Task>", () => {
  it("should render", () => {
    render(<Default />)
    const element = screen.getByText(/A Task/i)
    expect(element).not.toBeNull()
  })

  it("should render with a due date", () => {
    render(<HasDueDate />)
    const element = screen.getByText(/due today/i)
    const elementClass = element.getAttribute("class")
    expect(element).not.toBeNull()
    expect(elementClass).toContain("text-muted")
  })

  it("should highlight a past due date", () => {
    render(<HasDueDateInPast />)
    const element = screen.getByText(/past due/i)
    const elementClass = element.getAttribute("class")
    expect(element).not.toBeNull()
    expect(elementClass).toContain("text-destructive")
  })

  it("should render with a tag", () => {
    render(<HasTag />)
    const element = screen.getByText(/Foo/i)
    expect(element).not.toBeNull()
  })

  it("should increase size with age", () => {
    render(<HasAged />)
    const element = screen.getByText(/A Task/i)
    const elementClass = element.getAttribute("class")
    expect(element).not.toBeNull()
    expect(elementClass).toContain("text-m")
  })
})
