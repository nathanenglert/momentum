import { TrendingDown, TrendingUp } from "lucide-react"

import getTestIDs from "@/lib/getTestIDs"

export const testIDs = getTestIDs()

export const PercentageChange = ({
  current,
  previous,
}: {
  current: number
  previous: number
}) => {
  const percentage = ((current - previous) / previous) * 100
  const symbol = percentage > 0 ? "+" : ""
  const text =
    percentage === 0
      ? `no change from last month`
      : `${symbol}${percentage.toFixed(0)}% from last month`
  return (
    <p className="text-xs text-muted-foreground flex gap-2 items-center">
      {percentage != 0 &&
        (percentage > 0 ? (
          <TrendingUp
            size={16}
            className="note text-accent-foreground"
            data-testid={testIDs.positiveIcon}
          />
        ) : (
          <TrendingDown
            size={16}
            className="text-destructive"
            data-testid={testIDs.negativeIcon}
          />
        ))}
      <span>{text}</span>
    </p>
  )
}
