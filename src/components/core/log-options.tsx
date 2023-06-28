"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"

export interface LogOptionsProps {
  id: string
  type: "task" | "note"
  dict: any
}

export function LogOptions({ id, type, dict }: LogOptionsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const { toast } = useToast()
  const isMutating = isFetching || isPending

  const handleDelete = async () => {
    setIsFetching(true)

    const res = await fetch(`/api/${type}/${id}`, {
      method: "DELETE",
    })

    if (res.status == 200) {
      toast({
        description: dict.delete.toast,
      })
    }

    setIsFetching(false)
    startTransition(() => router.refresh())
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cn("transition", "py-0 h-auto")} variant={`ghost`}>
          <span className="sr-only">Menu</span>
          ...
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div
          className="z-10 mb-2 w-40 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            <Button
              className="gap-2 w-full"
              variant={`destructive`}
              role="menuitem"
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
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
