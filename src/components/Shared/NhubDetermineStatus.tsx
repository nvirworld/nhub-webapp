import React from 'react'
import * as Shared from './index'

interface NhubDetermineTypeProps {
  startDate: Date
  endDate: Date
}

enum EventStatusEnum {
  Upcoming = 'Upcoming',
  Ongoing = 'Ongoing',
  Closed = 'Closed'
}

const NhubDetermineStatus: React.FC<NhubDetermineTypeProps> = (props) => {
  const { startDate, endDate } = props

  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (now < start) {
    return (
      <Shared.NhubTypo type="bold" usage="cardTitle" color="mint">
        {EventStatusEnum.Upcoming}
      </Shared.NhubTypo>
    )
  } else if (now >= start && now <= end) {
    return (
      <Shared.NhubTypo type="bold" usage="cardTitle" color="ongoing">
        {EventStatusEnum.Ongoing}
      </Shared.NhubTypo>
    )
  } else {
    return (
      <Shared.NhubTypo type="bold" usage="cardTitle" color="closed">
        {EventStatusEnum.Closed}
      </Shared.NhubTypo>
    )
  }
}

export default NhubDetermineStatus
