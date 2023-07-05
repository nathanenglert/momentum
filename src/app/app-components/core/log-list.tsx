import { startOfDay } from "date-fns"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { LogGroup } from "@/components/core/log-group"
import { Meter as MeterItem } from "@/components/meters/meter"
import { Note as NoteItem } from "@/components/notes/note"
import { Task as TaskItem } from "@/components/tasks/task"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function LogList({ dict }: { dict: any }) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const today = startOfDay(new Date())

  const tasks = await prisma.task.findMany({
    where: {
      userId: currentUserId,
      completedAt: null,
    },
    include: { tags: true, habit: true },
    orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }],
  })

  const notes = await prisma.note.findMany({
    where: { userId: currentUserId, createdAt: { gte: today } },
    include: { tags: true },
    orderBy: { createdAt: "asc" },
  })

  const completed = await prisma.task.findMany({
    where: {
      userId: currentUserId,
      completedAt: { gte: today },
    },
    include: { tags: true, habit: true },
    orderBy: { completedAt: "desc" },
  })

  const meters = await prisma.meter.findMany({
    where: { userId: currentUserId },
    include: { tags: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <ul className="mt-12 space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          completedAt={task.completedAt}
          createdAt={task.createdAt}
          dueAt={task.dueAt}
          habit={task.habit}
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
      {completed.length > 0 && (
        <LogGroup title={`Completed Tasks (${completed.length})`}>
          {completed.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              completedAt={task.completedAt}
              createdAt={task.createdAt}
              dueAt={task.dueAt}
              habit={task.habit}
              tags={task.tags}
              title={task.title}
              dict={dict.taskList}
            />
          ))}
        </LogGroup>
      )}
      {meters.length > 0 && (
        <LogGroup title="Meters">
          {meters.map((meter) => (
            <MeterItem
              key={meter.id}
              id={meter.id}
              tags={meter.tags}
              title={meter.title}
              dict={{ ...dict.meterForm, ...dict.taskList }}
            />
          ))}
        </LogGroup>
      )}
    </ul>
  )
}
