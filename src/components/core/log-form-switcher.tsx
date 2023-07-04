"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MeterForm } from "@/components/meters/meter-form"
import { NoteForm } from "@/components/notes/note-form"
import { TaskForm } from "@/components/tasks/task-form"

const config = [
  { icon: Icons.checkSquare, form: TaskForm, dict: "taskForm" },
  { icon: Icons.minus, form: NoteForm, dict: "noteForm" },
  { icon: Icons.copyPlus, form: MeterForm, dict: "meterForm" },
]

export function LogFormSwitcher({ dict, tags }: { dict: any; tags: string[] }) {
  const [logType, setLogType] = useState(0)

  const handleSwitch = () => {
    setLogType((logType + 1) % config.length)
  }

  const Icon = config[logType].icon
  const Form = config[logType].form

  return (
    <div className="w-full flex">
      <div>
        <Button className="mt-2" variant={`ghost`} onClick={handleSwitch}>
          <Icon size={20} />
        </Button>
      </div>
      <div className="flex-grow">
        <Form dict={dict[config[logType].dict]} possibleTags={tags} />
      </div>
    </div>
  )
}
