import { add, formatDistanceToNow, isPast } from "date-fns"
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
    orderBy: [{ status: "desc" }, { completedAt: "desc" }],
  })

  const formatTime = (d: Date) => {
    const today = new Date()
    const hours = today.getHours()
    const minutes = today.getMinutes()
    const seconds = today.getSeconds()
    const milliseconds = today.getMilliseconds()

    d.setHours(hours, minutes, seconds, milliseconds)

    if (d.getDate() <= today.getDate()) return ` due today`
    if (d.getDate() == today.getDate() + 1) return ` due tomorrow`

    return ` in ${formatDistanceToNow(d)}`
  }

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
              {task.dueAt && task.status != `COMPLETED` && (
                <span className="italic text-muted-foreground">
                  {formatTime(task.dueAt)}
                </span>
              )}
            </label>
          </div>
          <div className="flex items-end gap-2">
            {task.tags?.map((tag) => (
              <Badge variant={`outline`}>{tag.name}</Badge>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
