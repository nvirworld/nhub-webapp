export enum EventStatusEnum {
  Upcoming = 'Upcoming',
  Ongoing = 'Ongoing',
  Closed = 'Closed'
}
const determineEventStatus = (start: Date, end: Date): EventStatusEnum => {
  const now = new Date()
  const startDate = new Date(start)
  const endDate = new Date(end)

  if (now < startDate) {
    return EventStatusEnum.Upcoming
  } else if (now >= startDate && now <= endDate) {
    return EventStatusEnum.Ongoing
  } else {
    return EventStatusEnum.Closed
  }
}
export default determineEventStatus
