import { endOfDay, startOfDay } from "date-fns"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { Note as NoteItem } from "@/components/notes/note"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function PreviousLogList({
  date,
  dict,
}: {
  date: Date
  dict: any
}) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const start = startOfDay(date)
  const end = endOfDay(date)

  const tasks = await prisma.task.findMany({
    where: {
      userId: currentUserId,
      completedAt: { gte: start, lte: end },
    },
    include: { tags: true },
    orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }],
  })

  const notes = await prisma.note.findMany({
    where: { userId: currentUserId, createdAt: { gte: start, lte: end } },
    include: { tags: true },
    orderBy: { createdAt: "asc" },
  })

  const metrics = await prisma.metric.findMany({
    where: { userId: currentUserId, createdAt: { gte: start, lte: end } },
    include: { tags: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <ul className="mt-12 space-y-4">
      {tasks.map((task) => (
        <NoteItem
          key={task.id}
          id={task.id}
          createdAt={task.createdAt}
          tags={task.tags}
          title={task.title}
          dict={dict.taskList}
        />
      ))}
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          createdAt={note.createdAt}
          tags={note.tags}
          title={note.title}
          dict={dict.taskList}
        />
      ))}
      {metrics.map((metric) => (
        <NoteItem
          key={metric.id}
          id={metric.id}
          createdAt={metric.createdAt}
          tags={metric.tags}
          title={metric.title}
          dict={dict.metricList}
        />
      ))}
    </ul>
  )
}
