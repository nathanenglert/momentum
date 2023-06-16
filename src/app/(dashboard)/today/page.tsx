import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { TaskForm } from "@/components/tasks/task-form"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { TaskList } from "@/app/app-components/task-list"
import { getDictionary } from "@/app/dictionaries"

export default async function TodayPage() {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!

  if (!currentUserId) {
    redirect("/api/auth/signin")
  }

  const dict = await getDictionary("bro")
  const tags = (await prisma.tag.findMany({ take: 100 })).map((tag) => tag.name)

  return (
    <section className="container grid gap-6 pb-8 pt-6 md:py-10">
      <div className="w-[420px] mx-auto my-24">
        <TaskForm dict={dict.taskForm} possibleTags={tags} />
        <TaskList dict={dict.taskList} />
      </div>
    </section>
  )
}
