"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function LogGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = isExpanded ? ChevronUp : ChevronDown
  return (
    <li>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger className="w-full flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background">
          <span className="inline-block w-[48px]">
            <Icon size={20} className={`mx-auto text-muted-foreground`} />
          </span>
          <span className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {title}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="mt-4 space-y-4">{children}</ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  )
}
