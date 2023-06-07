import { formatDistanceToNow } from "date-fns"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { Badge } from "../ui/badge"
import { TaskCheckbox } from "./task-checkbox"

export async function TaskList({ dict }: { dict: any }) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!

  const tasks = await prisma.task.findMany({
    where: { userId: currentUserId },
    include: { tags: true },
  })

  return (
    <ul className="mt-12 space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-between">
          <div className="flex items-center space-x-2">
            <TaskCheckbox
              id={task.id}
              status={task.status}
              dict={dict.status}
            />
            <label
              htmlFor={`done-${task.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {task.title}
              {task.dueDate && (
                <span className="italic text-muted-foreground">{` in ${formatDistanceToNow(
                  task.dueDate
                )}`}</span>
              )}
            </label>
          </div>
          <div className="flex items-end gap-2">
            {task.tags.map((tag) => (
              <Badge variant={`outline`}>{tag.name}</Badge>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
