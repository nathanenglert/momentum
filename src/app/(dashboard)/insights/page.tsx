import { createElement } from "react"
import { redirect } from "next/navigation"
import { addDays } from "date-fns"
import {
  CheckSquare,
  LucideIcon,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
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

  const periodDate = addDays(new Date(), -30)
  const previousDate = addDays(new Date(), -60)

  const noteCount = await prisma.note.count({
    where: {
      userId: currentUserId,
      createdAt: {
        gte: periodDate,
      },
    },
  })

  const previousNoteCount = await prisma.note.count({
    where: {
      userId: currentUserId,
      createdAt: {
        gte: previousDate,
        lte: periodDate,
      },
    },
  })

  const periodTasks = await prisma.task.findMany({
    where: {
      userId: currentUserId,
      completedAt: {
        gte: periodDate,
      },
    },
    select: {
      completedAt: true,
    },
  })

  const previousTaskCount = await prisma.task.count({
    where: {
      userId: currentUserId,
      completedAt: {
        gte: previousDate,
        lte: periodDate,
      },
    },
  })

  const questions = await prisma.question.findMany({
    where: {
      userId: currentUserId,
    },
  })

  return (
    <section className="container grid gap-6 md:py-10">
      <div className="w-[600px] mx-auto mt-24 grid grid-cols-2 gap-4">
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
        <div className=" col-span-2 mt-12">
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

const MetricDisplay = ({
  name,
  value,
  previous,
  icon,
}: {
  name: string
  value: number
  previous?: number
  icon?: LucideIcon
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        {icon &&
          createElement(icon, { size: 16, className: "text-muted-foreground" })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value.toString()}</div>
        {previous && <PercentageChange current={value} previous={previous} />}
      </CardContent>
    </Card>
  )
}

const PercentageChange = ({
  current,
  previous,
}: {
  current: number
  previous: number
}) => {
  const percentage = ((current - previous) / previous) * 100
  const symbol = percentage > 0 ? "+" : ""
  const text =
    percentage === 0
      ? `no change from last month`
      : `${symbol}${percentage}% from last month`
  return (
    <p className="text-xs text-muted-foreground flex gap-2 items-center">
      {percentage != 0 &&
        (percentage > 0 ? (
          <TrendingUp size={16} className="note text-accent-foreground" />
        ) : (
          <TrendingDown size={16} className="text-destructive" />
        ))}
      <span>{text}</span>
    </p>
  )
}
