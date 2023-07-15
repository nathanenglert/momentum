import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { CommandMenu } from "@/components/core/command-menu"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PreviousLogList } from "@/app/app-components/core/previous-log-list"
import { getDictionary } from "@/app/dictionaries"

export default async function OnDatePage({
  params,
}: {
  params: { date: string }
}) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const date = new Date(params.date)

  if (!currentUserId) {
    redirect("/api/auth/signin")
  }

  const cookieStore = cookies()
  const localeCookie = cookieStore.get("locale")
  const locale = localeCookie ? localeCookie.value : "en"

  const dict = await getDictionary(locale)
  const AwaitedTaskList: JSX.Element = await PreviousLogList({ date, dict })

  return (
    <section className="container grid gap-6 md:py-10">
      <div className="w-[600px] mx-auto mt-24">
        <div className="h-[104px]"></div>
        {AwaitedTaskList}
      </div>
      <CommandMenu />
    </section>
  )
}
