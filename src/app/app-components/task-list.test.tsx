import { cleanup, render, screen } from "@testing-library/react"

import { prismaMock } from "@/lib/prismaMock"

import { TaskList } from "./task-list"

afterEach(cleanup)

jest.mock("next/navigation", () => {
  return {
    __esmodule: true,
    useRouter: jest.fn().mockReturnValue({
      refresh: () => {},
    }),
  }
})

jest.mock("next-auth", () => {
  return {
    __esModule: true,
    getServerSession: jest.fn().mockResolvedValue({
      user: {
        id: "foo",
      },
    }),
  }
})

beforeEach(() => {
  prismaMock.task.findMany.mockResolvedValue([
    {
      id: "1",
      completedAt: null,
      createdAt: new Date(),
      description: null,
      dueAt: null,
      habitId: null,
      status: "NOT_STARTED",
      title: "Foo This",
      updatedAt: new Date(),
      userId: "1",
    },
  ])
})

/**
 * @param {function} Component
 * @param {*} props
 * @returns {Promise<()=>JSX.Element>}
 */
async function resolvedComponent({
  Component,
  props,
}: {
  Component: (arg0: any) => any
  props: any
}): Promise<() => any> {
  const ComponentResolved = await Component(props)
  return () => ComponentResolved
}

describe("task list", () => {
  it("fwefw", async () => {
    const HeaderResolved = await resolvedComponent({
      Component: TaskList,
      props: {
        dict: {
          taskList: {
            status: {
              complete: {
                toast: "CRUSHED!",
              },
            },
          },
        },
      },
    })
    render(<HeaderResolved />)

    expect(await screen.findByText("Foo This"))
  })
})
