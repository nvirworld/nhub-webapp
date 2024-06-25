export const determineType = (
  startedAt: Date,
  withdrawEnabledAt: Date,
  endedAt: Date
): 'Flexible' | 'Locked' | 'Hybrid' => {
  const s = new Date(startedAt)
  const w = new Date(withdrawEnabledAt)
  const e = new Date(endedAt)
  if (w <= s) {
    return 'Flexible'
  }
  if (e <= w) {
    return 'Locked'
  }
  return 'Hybrid'
}
