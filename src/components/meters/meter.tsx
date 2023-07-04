"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { MeterOptions } from "./meter-options"

export interface MeterProps {
  id: string
  title: string
  tags: {
    id: string
    name: string
  }[]
  dict: any
}

export function Meter({ id, tags, title, dict }: MeterProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending
  const { toast } = useToast()

  const handleAddTask = async () => {
    setIsFetching(true)

    const res = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify({
        completedAt: new Date(),
        title,
        tags: tags.map((tag) => tag.name),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    setIsFetching(false)

    if (res.status === 201) {
      toast({
        description: dict.submit.toastSuccess,
      })

      startTransition(() => {
        router.refresh()
      })
    } else {
      toast({
        description: dict.submit.toastError,
        variant: "destructive",
      })
    }
  }

  return (
    <li className="flex justify-between">
      <div className="flex items-center space-x-2">
        <Button
          variant={`ghost`}
          className="px-[14px] py-0 h-auto"
          disabled={isMutating}
          onClick={handleAddTask}
        >
          <Icons.plusSquare size={20} />
        </Button>
        <label
          htmlFor={`done-${id}`}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          )}
        >
          {title}
        </label>
      </div>
      <div className="flex items-end gap-2">
        {tags?.map((tag) => (
          <Badge key={tag.id} variant={`outline`}>
            {tag.name}
          </Badge>
        ))}
        <MeterOptions id={id} dict={dict.status} />
      </div>
    </li>
  )
}
