import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { TaskForm } from "@/components/tasks/task-form"
import { TaskList } from "@/components/tasks/task-list"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getDictionary } from "@/app/dictionaries"

export default async function TodayPage() {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!

  if (!currentUserId) {
    redirect("/api/auth/signin")
  }

  const dict = await getDictionary("bro")

  return (
    <section className="container grid gap-6 pb-8 pt-6 md:py-10">
      <div className="w-[420px] mx-auto my-24">
        <TaskForm dict={dict.taskForm} />
        <TaskList />
      </div>
    </section>
  )
}
