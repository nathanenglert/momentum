"use client"

import { useState } from "react"

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

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false)

  useKeyboardShortcut(["meta", "k"], () => setIsOpen(true))

  const handleLogTypeChange = (type: number) => {
    eventBus.dispatch("log-type:change", type)
    setIsOpen(false)
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen} className="h-[300px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => handleLogTypeChange(0)}>
            <Icons.checkSquare className="mr-2 h-4 w-4" />
            <span>Create Task</span>
          </CommandItem>
          <CommandItem onSelect={() => handleLogTypeChange(1)}>
            <Icons.minus className="mr-2 h-4 w-4" />
            <span>Create Note</span>
          </CommandItem>
          <CommandItem onSelect={() => handleLogTypeChange(2)}>
            <Icons.copyPlus className="mr-2 h-4 w-4" />
            <span>Create Meter</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
