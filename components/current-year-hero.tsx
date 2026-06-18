"use client"

import { useYearTimer } from "@/hooks/use-year-timer"

export default function CurrentYearHero() {

  const year = new Date().getFullYear()
  const { time } = useYearTimer(year)

  return (
    <div className="text-center mb-16">

      <h1 className="text-5xl font-bold mb-4">
        {year}
      </h1>

      <p className="text-muted-foreground mb-6">
        Time remaining in this year
      </p>

      <div className="flex justify-center gap-6 text-2xl font-semibold">
        <span>{time.days}d</span>
        <span>{time.hours}h</span>
        <span>{time.minutes}m</span>
        <span>{time.seconds}s</span>
      </div>

    </div>
  )
}
