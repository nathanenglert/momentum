"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { NoteForm } from "@/components/notes/note-form"
import { TaskForm } from "@/components/tasks/task-form"

const config = {
  task: { icon: Icons.checkSquare, form: TaskForm },
  note: { icon: Icons.minus, form: NoteForm },
}

export function LogFormSwitcher({ dict, tags }: { dict: any; tags: string[] }) {
  const [logType, setLogType] = useState<"task" | "note">("task")

  const handleSwitch = () => {
    setLogType(logType === "task" ? "note" : "task")
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
        <Form dict={dict[`${logType}Form`]} possibleTags={tags} />
      </div>
    </div>
  )
}
