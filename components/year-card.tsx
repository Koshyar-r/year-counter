"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useYearTimer } from "@/hooks/use-year-timer"
import { getYearProgress } from "@/helper/helpers"

export default function YearCard({ year }: { year: number }) {
  const { label, time } = useYearTimer(year)
  const [progress, setProgress] = useState(0)

  const isCurrent = new Date().getFullYear() === year

  useEffect(() => {
    const update = () => {
      setProgress(getYearProgress(year))
    }

    update()
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [year])

  return (
    <Card className={isCurrent ? "border-primary border-2" : ""}>
      <CardHeader>
        <CardTitle>{year}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{label}</p>

        <div className="grid grid-cols-4 text-center">
          <div>
            <div className="text-lg font-semibold">{time.days}</div>
            <div className="text-xs text-muted-foreground">days</div>
          </div>

          <div>
            <div className="text-lg font-semibold">{time.hours}</div>
            <div className="text-xs text-muted-foreground">hours</div>
          </div>

          <div>
            <div className="text-lg font-semibold">{time.minutes}</div>
            <div className="text-xs text-muted-foreground">minutes</div>
          </div>

          <div>
            <div className="text-lg font-semibold">{time.seconds}</div>
            <div className="text-xs text-muted-foreground">seconds</div>
          </div>
        </div>

        <Progress value={progress} />

      </CardContent>
    </Card>
  )
}