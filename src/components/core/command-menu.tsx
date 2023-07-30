"use client"

import { createElement, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LineChart } from "lucide-react"

import eventBus from "@/lib/event-bus"
import { cn } from "@/lib/utils"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { LogFormConfig, LogType } from "./log-form-switcher"

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const currentPath = usePathname()
  const router = useRouter()

  useKeyboardShortcut(["meta", "k"], () => setIsOpen(true))

  const handleLogTypeChange = (type: string) => {
    if (currentPath !== "/today") {
      router.push("/today")
      return
    }

    eventBus.dispatch("log-type:change", type as LogType)
    setIsOpen(false)
  }

  const goTo = (page: string) => {
    if (currentPath === page) {
      setIsOpen(false)
      return
    }
    router.push(page)
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen} className="h-[300px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {Object.entries(LogFormConfig).map(([key, logType]) => (
            <CommandItem
              onSelect={() => handleLogTypeChange(key)}
              className={cn(key, "text-accent-foreground")}
            >
              {createElement(logType.icon, { className: "mr-2 h-4 w-4" })}
              <span>Create {logType.title}</span>
            </CommandItem>
          ))}
          {[
            ["Insights", "/insights"],
            ["Today", "/today"],
          ].map(([title, page]) => (
            <CommandItem onSelect={() => goTo(page)}>
              <LineChart className="mr-2 h-4 w-4" />
              <span>Go to {title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
