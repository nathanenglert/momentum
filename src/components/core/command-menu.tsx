"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"

import eventBus from "@/lib/event-bus"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Icons } from "@/components/icons"

import { LogType } from "./log-form-switcher"

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false)

  useKeyboardShortcut(["meta", "k"], () => setIsOpen(true))

  const handleLogTypeChange = (type: string) => {
    eventBus.dispatch("log-type:change", type as LogType)
    setIsOpen(false)
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen} className="h-[300px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem
            onSelect={() => handleLogTypeChange("task")}
            className="task text-accent-foreground"
          >
            <Icons.checkSquare className="mr-2 h-4 w-4" />
            <span>Create Task</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleLogTypeChange("note")}
            className="note text-accent-foreground"
          >
            <Icons.minus className="mr-2 h-4 w-4" />
            <span>Create Note</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleLogTypeChange("meter")}
            className="meter text-accent-foreground"
          >
            <Icons.copyPlus className="mr-2 h-4 w-4" />
            <span>Create Meter</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleLogTypeChange("metric")}
            className="metric text-accent-foreground"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Create Metric</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
