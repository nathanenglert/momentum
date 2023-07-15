"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { addDays, format, isYesterday } from "date-fns"
import { ChevronRight } from "lucide-react"

export default function NextPageLink() {
  const params = useParams()
  const isToday = !params.date

  if (isToday) return <ChevronRight className="text-muted" />

  let nextPage = "/today"
  const temp = new Date(params.date + "T12:00:00Z")

  if (!isYesterday(temp)) {
    const nextDate = addDays(temp, 1)
    nextPage = `/on/${format(nextDate, "yyyy-MM-dd")}`
  }

  return (
    <Link href={nextPage}>
      <ChevronRight />
    </Link>
  )
}
