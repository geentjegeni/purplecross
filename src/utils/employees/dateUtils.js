export function getDateStatus(date) {
  if (!date) {
    return null
  }

  const today = new Date().toISOString().slice(0, 10)

  return date > today ? 'future' : 'past'
}
