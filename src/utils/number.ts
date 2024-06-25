export const toLocaleWithFixed = (value: number | string | undefined) => {
  if (typeof value === 'string') {
    value = Number(value)
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
