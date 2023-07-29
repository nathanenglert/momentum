"use client"

import { TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { MetricOptions } from "./metric-options"

export interface MetricProps {
  id: string
  value: number
  tags: {
    id: string
    name: string
  }[]
  dict: any
}

export function Metric({ id, tags, value, dict }: MetricProps) {
  return (
    <li className="flex justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-[48px]">
          <TrendingUp size={20} className={`mx-auto`} />
        </div>
        <label
          htmlFor={`done-${id}`}
          className={cn(
            "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          )}
        >
          {value}
        </label>
      </div>
      <div className="flex items-end gap-2">
        {tags?.map((tag) => (
          <Badge key={tag.id} variant={`outline`}>
            {tag.name}
          </Badge>
        ))}
        <MetricOptions id={id} dict={dict.status} />
      </div>
    </li>
  )
}
