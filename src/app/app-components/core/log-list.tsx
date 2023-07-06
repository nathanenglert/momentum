import { startOfToday, startOfTomorrow } from "date-fns"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { LogGroup } from "@/components/core/log-group"
import { Meter as MeterItem } from "@/components/meters/meter"
import { Note as NoteItem } from "@/components/notes/note"
import { Task as TaskItem } from "@/components/tasks/task"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { InspirationalQuote } from "../../../components/core/inspirational-quote"

export async function LogList({ dict }: { dict: any }) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const today = startOfToday()
  const tomorrow = startOfTomorrow()

  const tasks = await prisma.task.findMany({
    where: {
      userId: currentUserId,
      OR: [{ completedAt: null }, { completedAt: { gte: today } }],
    },
    include: { tags: true, habit: true },
    orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }],
  })

  const tasksCompleted = tasks
    .filter((task) => task.completedAt)
    .sort((a, b) => {
      if (a.completedAt! > b.completedAt!) return -1
      if (a.completedAt! < b.completedAt!) return 1
      return 0
    })

  const tasksInFuture = tasks
    .filter((task) => task.dueAt && task.dueAt >= tomorrow)
    .sort((a, b) => {
      if (a.dueAt! < b.dueAt!) return -1
      if (a.dueAt! > b.dueAt!) return 1
      return 0
    })

  const tasksToday = tasks
    .filter(
      (task) => !task.completedAt && (!task.dueAt || task.dueAt < tomorrow)
    )
    .sort((a, b) => {
      if (a.createdAt < b.createdAt) return -1
      if (a.createdAt > b.createdAt) return 1
      return 0
    })

  const notes = await prisma.note.findMany({
    where: { userId: currentUserId, createdAt: { gte: today } },
    include: { tags: true },
    orderBy: { createdAt: "asc" },
  })

  const meters = await prisma.meter.findMany({
    where: { userId: currentUserId },
    include: { tags: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <ul className="mt-12 space-y-4">
      {tasks.length === 0 && (
        <li className="pl-[56px] mb-12 space-y-4">
          <p
            dangerouslySetInnerHTML={{
              __html:
                tasksCompleted.length > 0
                  ? dict.taskList.empty.noTasksLeft
                  : dict.taskList.empty.noTasks,
            }}
          />
          {tasksCompleted.length == 0 && (
            <InspirationalQuote dict={dict.inspiration} />
          )}
        </li>
      )}
      {tasksToday.map((task) => (
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
      {tasksInFuture.length > 0 && (
        <LogGroup title={`Future Tasks (${tasksInFuture.length})`}>
          {tasksInFuture.map((task) => (
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
      {tasksCompleted.length > 0 && (
        <LogGroup title={`Completed Tasks (${tasksCompleted.length})`}>
          {tasksCompleted.map((task) => (
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
