import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

  const taskCount = await prisma.task.count({
    select: {
      _all: true,
      completedAt: true,
    },
    where: {
      userId: currentUserId,
    },
  })

  const noteCount = await prisma.note.count({
    where: {
      userId: currentUserId,
    },
  })

  const questions = await prisma.question.findMany({
    where: {
      userId: currentUserId,
    },
  })

  const raw = await prisma.task.findMany({
    where: {
      userId: currentUserId,
      completedAt: {
        not: null,
      },
    },
    select: {
      completedAt: true,
    },
  })

  const byDay = raw.reduce((acc, curr) => {
    const date = new Date(curr.completedAt!).toLocaleDateString()
    if (acc[date]) {
      acc[date] += 1
    } else {
      acc[date] = 1
    }
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(byDay).map(([name, total]) => ({
    name,
    total,
  }))

  return (
    <section className="container grid gap-6 md:py-10">
      <div className="w-[600px] mx-auto mt-24 grid grid-cols-2 gap-4">
        <MetricDisplay name="Tasks" value={taskCount._all} />
        <MetricDisplay name="Notes" value={noteCount} />
        {/* <MetricDisplay name="Completed Tasks" value={taskCount.completedAt} /> */}
        <div className=" col-span-2 mt-12">
          <TasksOverTime data={data} />
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

const MetricDisplay = ({ name, value }: { name: string; value: number }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toString()}</div>
        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
      </CardContent>
    </Card>
  )
}
