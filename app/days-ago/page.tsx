"use client"

import { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Hash, History } from "lucide-react"

// Helper functions for date logic
const getResult = (daysAgo: number) => {
  const target = new Date()
  target.setDate(target.getDate() - daysAgo)

  const dateText = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(target)

  const dayText = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(target)

  // Day of year
  const start = new Date(target.getFullYear(), 0, 0)
  const diff = target.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / 86400000)

  const totalDays =
    (target.getFullYear() % 4 === 0 && target.getFullYear() % 100 !== 0) ||
    target.getFullYear() % 400 === 0
      ? 366
      : 365

  // Week number
  const weekNumber = Math.ceil(dayOfYear / 7)

  return {
    dateText,
    dayText,
    weekText: `${weekNumber} / 53`,
    yearText: `${dayOfYear} / ${totalDays}`,
    year: target.getFullYear(),
  }
}

export default function DaysAgoPage() {
  const [daysInput, setDaysInput] = useState("0")

  const daysAgo = Number(daysInput || 0)
  const result = useMemo(() => getResult(daysAgo), [daysAgo])

  return (
    <main className="container mx-auto max-w-4xl space-y-12 py-16">
      {/* Header Section */}
      <div className="space-y-4 text-center">
        <Badge variant="outline" className="gap-2 px-4 py-1 text-sm">
          <History className="h-4 w-4" /> Days Ago Calculator
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Time Travel Backwards
        </h1>
        <p className="text-lg text-muted-foreground">
          Enter a number of days to see exactly where you land in history.
        </p>
      </div>

      {/* Input Section */}
      <Card className="mx-auto max-w-md overflow-hidden border shadow-sm">
        <div className="border-b bg-muted/50 px-6 py-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
            Days Ago
          </span>
        </div>

        <CardContent className="p-10">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={daysInput}
            onChange={(e) => {
              const next = e.target.value
              if (/^\d*$/.test(next)) {
                setDaysInput(next)
              }
            }}
            className="w-full bg-transparent text-center text-4xl font-bold tracking-tight outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Enter a number..."
          />
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        <ResultCard
          icon={<Calendar className="h-5 w-5" />}
          label="Date"
          value={result.dateText}
        />

        <ResultCard
          icon={<Clock className="h-5 w-5" />}
          label="Day of the Week"
          value={result.dayText}
        />

        <ResultCard
          icon={<Hash className="h-5 w-5" />}
          label="Week Number"
          value={result.weekText}
          description="weeks into the year"
        />

        <ResultCard
          icon={<Calendar className="h-5 w-5" />}
          label="Day of the Year"
          value={result.yearText}
          description="days into the year"
        />
      </div>

      {/* Narrative Summary */}
      <Card className="border-primary/10 bg-primary/5">
        <CardContent className="p-8">
          <p className="text-center text-xl leading-relaxed italic">
            "Go back{" "}
            <span className="font-bold text-primary">
              {daysInput ? Number(daysInput).toLocaleString() : 0} days
            </span>{" "}
            from today and you'll arrive on
            <span className="font-bold text-primary">
              {" "}
              {result.dayText}, {result.dateText}
            </span>
            . It was the{" "}
            <span className="font-bold">{result.weekText.split(" ")[0]}th</span>{" "}
            week of the year
            <span className="font-bold text-primary"> {result.year}</span>."
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

function ResultCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode
  label: string
  value: string
  description?: string
}) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</div>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <CardDescription className="mt-1">{description}</CardDescription>
        )}
      </CardContent>
    </Card>
  )
}
