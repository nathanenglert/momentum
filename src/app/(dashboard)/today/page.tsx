import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { LogFormSwitcher } from "@/components/core/log-form-switcher"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { LogList } from "@/app/app-components/core/log-list"
import { TaskActivity } from "@/app/app-components/task-activity"
import { getDictionary } from "@/app/dictionaries"

export default async function TodayPage() {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!

  if (!currentUserId) {
    redirect("/api/auth/signin")
  }

  const dict = await getDictionary("bro")
  const tags = (await prisma.tag.findMany({ take: 100 })).map((tag) => tag.name)
  const AwaitedTaskList: JSX.Element = await LogList({ dict })
  const AwaitedTaskActivity: JSX.Element = await TaskActivity()

  return (
    <section className="container grid gap-6 md:py-10">
      <div className="w-[600px] mx-auto mt-24">
        <LogFormSwitcher dict={dict} tags={tags} />
        {AwaitedTaskList}
      </div>
      <div className="w-[600px] mx-auto mt-8">{AwaitedTaskActivity}</div>
    </section>
  )
}
