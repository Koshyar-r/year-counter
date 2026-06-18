"use client"

import { useState } from "react"
import YearCard from "@/components/year-card"
import CurrentYearHero from "@/components/current-year-hero"
import ThemeToggle from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"

export default function Home() {
  const currentYear = new Date().getFullYear()

  const [startYear, setStartYear] = useState(currentYear - 5)

  const years = Array.from({ length: 40 }, (_, i) => startYear + i)

  return (
    <main className="container mx-auto py-16 space-y-12">

      <CurrentYearHero />

      <div className="max-w-sm mx-auto text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Choose starting year
        </p>

        <Input
          type="number"
          value={startYear}
          onChange={(e) => setStartYear(Number(e.target.value))}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {years.map((year) => (
          <YearCard key={year} year={year} />
        ))}
      </div>

    </main>
  )
}