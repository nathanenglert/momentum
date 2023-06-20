import { Habit, Tag, Task } from "@prisma/client"
import { startOfDay } from "date-fns"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { sortTasksByCriteria } from "@/lib/tasks"
import { Task as TaskItem } from "@/components/tasks/task"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function TaskList({ dict }: { dict: any }) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const today = startOfDay(new Date())

  const tasks = await prisma.task.findMany({
    where: {
      userId: currentUserId,
      OR: [{ completedAt: null }, { completedAt: { gte: today } }],
    },
    include: { tags: true, habit: true },
  })

  const sorted = sortTasksByCriteria(tasks) as (Task & {
    tags: Tag[]
    habit: Habit | null
  })[]

  return (
    <ul className="mt-12 space-y-4">
      {sorted.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          completedAt={task.completedAt}
          createdAt={task.createdAt}
          dueAt={task.dueAt}
          habit={task.habit}
          tags={task.tags}
          title={task.title}
          dict={dict}
        />
      ))}
    </ul>
  )
}
