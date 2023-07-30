import { redirect } from "next/navigation"
import { addDays } from "date-fns"
import { CheckSquare, Minus } from "lucide-react"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { MetricDisplay } from "@/components/charts/metric-display"
import { TagTreemap } from "@/components/charts/tag-treemap"
import { TasksOverTime } from "@/components/charts/tasks-over-time"
import { CommandMenu } from "@/components/core/command-menu"
import { QuestionList } from "@/components/questions/question-list"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function Insights() {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!

  if (!currentUserId) {
    redirect("/api/auth/signin")
  }

  const periodDate = addDays(new Date(), -30)
  const previousDate = addDays(new Date(), -60)

  const noteCount = await prisma.note.count({
    where: {
      userId: currentUserId,
      createdAt: { gte: periodDate },
    },
  })

  const previousNoteCount = await prisma.note.count({
    where: {
      userId: currentUserId,
      createdAt: { gte: previousDate, lte: periodDate },
    },
  })

  const periodTasks = await prisma.task.findMany({
    where: {
      userId: currentUserId,
      completedAt: { gte: periodDate },
    },
    select: { completedAt: true },
  })

  const previousTaskCount = await prisma.task.count({
    where: {
      userId: currentUserId,
      completedAt: { gte: previousDate, lte: periodDate },
    },
  })

  const tagCount = (
    await prisma.tag.findMany({
      select: {
        _count: {
          select: {
            tasks: {
              where: {
                userId: currentUserId,
                completedAt: { gte: periodDate },
              },
            },
          },
        },
        name: true,
      },
    })
  ).map((tag) => ({
    name: tag.name,
    size: tag._count.tasks,
  }))

  const questions = await prisma.question.findMany({
    where: { userId: currentUserId },
  })

  return (
    <section className="container grid gap-6 md:py-10">
      <div className="w-[600px] mx-auto my-24 grid grid-cols-2 gap-4">
        <MetricDisplay
          name="Tasks"
          value={periodTasks.length}
          previous={previousTaskCount}
          icon={CheckSquare}
        />
        <MetricDisplay
          name="Notes"
          value={noteCount}
          previous={previousNoteCount}
          icon={Minus}
        />
        <div className="col-span-2">
          {/* <h2 className="text-lg font-medium mb-4 text-center">Tags</h2> */}
          <TagTreemap tags={tagCount} />
        </div>
        <div className="col-span-2 mt-12">
          <h2 className="text-lg font-medium mb-4 text-center">
            Tasks Completed
          </h2>
          <TasksOverTime tasks={periodTasks} />
        </div>
      </div>
      {questions.length > 0 && (
        <div className="w-[600px] mx-auto mt-2">
          <QuestionList questions={questions} />
        </div>
      )}
      {/* <div className="w-[600px] mx-auto mt-8">{AwaitedTaskActivity}</div> */}
      <CommandMenu />
    </section>
  )
}
