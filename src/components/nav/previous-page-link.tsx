"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { addDays, format, startOfYesterday } from "date-fns"
import { ChevronLeft } from "lucide-react"

export default function PreviousPageLink() {
  const params = useParams()
  const isToday = !params.date
  const previousDate = isToday
    ? startOfYesterday()
    : addDays(new Date(params.date + "T12:00:00Z"), -1)

  const previousPage = `/on/${format(previousDate, "yyyy-MM-dd")}`

  return (
    <Link href={previousPage}>
      <ChevronLeft />
    </Link>
  )
}
