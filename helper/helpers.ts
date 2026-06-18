export function getYearProgress(year: number) {
  const now = new Date()
  const start = new Date(year, 0, 1)
  const end = new Date(year, 11, 31, 23, 59, 59)

  if (now < start) return 0
  if (now > end) return 100

  const total = end.getTime() - start.getTime()
  const passed = now.getTime() - start.getTime()

  return (passed / total) * 100
}