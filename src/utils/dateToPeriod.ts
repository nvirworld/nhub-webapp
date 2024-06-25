import { format, parseISO } from 'date-fns'

const dateToPeriod = (inputDate: Date | string) => {
  if (typeof inputDate === 'string') {
    const date = parseISO(inputDate)
    return format(date, 'yy-MM-dd HH:mm')
  }
  return format(inputDate, 'yy-MM-dd HH:mm')
}

export default dateToPeriod
