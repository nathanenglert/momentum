import { createElement } from "react"
import { LucideIcon } from "lucide-react"

import getTestIDs from "@/lib/getTestIDs"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { PercentageChange } from "./percentage-change"

export const testIDs = getTestIDs()

export const MetricDisplay = ({
  name,
  value,
  previous,
  icon,
}: {
  name: string
  value: number
  previous?: number
  icon?: LucideIcon
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        {icon &&
          createElement(icon, {
            size: 16,
            className: "text-muted-foreground",
            "data-testid": testIDs.icon,
          })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value.toString()}</div>
        {previous && <PercentageChange current={value} previous={previous} />}
      </CardContent>
    </Card>
  )
}
