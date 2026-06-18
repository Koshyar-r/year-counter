"use client"

import { useEffect, useState } from "react"

function format(ms: number) {
  let total = Math.floor(ms / 1000)

  const days = Math.floor(total / 86400)
  total %= 86400

  const hours = Math.floor(total / 3600)
  total %= 3600

  const minutes = Math.floor(total / 60)
  const seconds = total % 60

  return { days, hours, minutes, seconds }
}

export function useYearTimer(year: number) {
  const [data, setData] = useState({
    label: "",
    time: { days: 0, hours: 0, minutes: 0, seconds: 0 }
  })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const start = new Date(year, 0, 1)
      const end = new Date(year, 11, 31, 23, 59, 59)

      if (now < start) {
        const diff = start.getTime() - now.getTime()
        setData({
          label: "starts in",
          time: format(diff)
        })
      } else if (now > end) {
        const diff = now.getTime() - end.getTime()
        setData({
          label: "ended",
          time: format(diff)
        })
      } else {
        const diff = end.getTime() - now.getTime()
        setData({
          label: "ends in",
          time: format(diff)
        })
      }
    }

    update()
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [year])

  return data
}