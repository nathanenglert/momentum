"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { addDays } from "date-fns"
import { MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useToast } from "../ui/use-toast"

export interface LogOptionsProps {
  id: string
  type: "task" | "note" | "meter" | "metric"
  dict: any
  dueAt?: Date
  completedAt?: Date
}

export function LogOptions({
  id,
  type,
  dict,
  dueAt,
  completedAt,
}: LogOptionsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const { toast } = useToast()
  const isMutating = isFetching || isPending

  const requestAndRefresh = async (
    func: () => Promise<Response>,
    successToast: string
  ) => {
    setIsFetching(true)

    const res = await func()

    if (res.status == 200) {
      toast({
        description: successToast,
      })
    }

    setIsFetching(false)
    startTransition(() => router.refresh())
  }

  const handleDelete = async () => {
    await requestAndRefresh(
      () =>
        fetch(`/api/${type}/${id}`, {
          method: "DELETE",
        }),
      dict.delete.toast
    )
  }

  const handlePush = async (days: number) => {
    if (!dueAt) return

    const newDate = addDays(dueAt, days)

    await requestAndRefresh(
      () =>
        fetch(`/api/${type}/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            dueAt: newDate,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }),
      dict.push.toast
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("transition", "py-0 h-auto text-muted-foreground")}
          variant={`ghost`}
        >
          <span className="sr-only">Menu</span>
          <MoreHorizontal size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-40">
        {!!dueAt && !completedAt && (
          <>
            <DropdownMenuLabel>Snooze</DropdownMenuLabel>
            {[
              ["1 day", 1],
              ["3 days", 3],
              ["1 week", 7],
            ].map(([label, days]) => (
              <DropdownMenuItem
                key={days}
                className="cursor-pointer px-4"
                disabled={isMutating}
                onClick={() => handlePush(days as number)}
              >
                {label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
          disabled={isMutating}
          onClick={() => handleDelete()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
