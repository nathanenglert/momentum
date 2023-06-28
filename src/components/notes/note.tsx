"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"

import { NoteOptions } from "./note-options"

export interface NoteProps {
  id: string
  createdAt: Date
  title: string
  tags: {
    id: string
    name: string
  }[]
  dict: any
}

export function Note({ id, createdAt, tags, title, dict }: NoteProps) {
  return (
    <li className="flex justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-[48px]">
          <Icons.minus size={20} className={`mx-auto`} />
        </div>
        <label
          htmlFor={`done-${id}`}
          className={cn(
            "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
        <NoteOptions id={id} dict={dict.status} />
      </div>
    </li>
  )
}
