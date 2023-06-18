import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { Task } from "@/components/tasks/task"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function TaskList({ dict }: { dict: any }) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!

  const tasks = await prisma.task.findMany({
    where: { userId: currentUserId },
    include: { tags: true, habit: true },
    orderBy: [{ completedAt: "asc" }],
  })

  return (
    <ul className="mt-12 space-y-4">
      {tasks.map((task) => (
        <Task
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
