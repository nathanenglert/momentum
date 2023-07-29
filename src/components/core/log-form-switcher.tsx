"use client"

import { useEffect, useState } from "react"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { TrendingUp } from "lucide-react"

import eventBus from "@/lib/event-bus"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MeterForm } from "@/components/meters/meter-form"
import { MetricForm } from "@/components/metrics/metric-form"
import { NoteForm } from "@/components/notes/note-form"
import { TaskForm } from "@/components/tasks/task-form"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu"

const config = {
  task: { icon: Icons.checkSquare, form: TaskForm, dict: "taskForm" },
  note: { icon: Icons.minus, form: NoteForm, dict: "noteForm" },
  meter: { icon: Icons.copyPlus, form: MeterForm, dict: "meterForm" },
  metric: { icon: TrendingUp, form: MetricForm, dict: "metricForm" },
}
export type LogType = "task" | "note" | "meter" | "metric"

export function LogFormSwitcher({ dict, tags }: { dict: any; tags: string[] }) {
  const [logType, setLogType] = useState<LogType>("task")

  useEffect(() => {
    eventBus.on("log-type:change", (type: LogType) => {
      setLogType(type)
    })
  }, [])

  const Icon = config[logType].icon
  const Form = config[logType].form

  return (
    <div className={cn("w-full flex", logType)}>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="mt-2 focus-visible:ring-2 focus-visible:ring-offset-0 text-accent-foreground"
              variant={`ghost`}
            >
              <Icon size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.keys(config).map((key) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setLogType(key as LogType)}
              >
                {key}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-grow">
        <Form dict={dict[config[logType].dict]} possibleTags={tags} />
      </div>
    </div>
  )
}
