import React, { useEffect, useState } from 'react'

interface DDayCounterProps {
  targetDate: Date
}

const NhubDday: React.FC<DDayCounterProps> = ({ targetDate }) => {
  const [remainingTime, setRemainingTime] = useState<string>('')

  useEffect(() => {
    const calculateTimeDifference = () => {
      const now = new Date()
      const dueDate = new Date(targetDate)
      let diffInSeconds = (dueDate.getTime() - now.getTime()) / 1000

      let prefix = 'D-'

      if (diffInSeconds < 0) {
        prefix = 'D+'
        diffInSeconds = Math.abs(diffInSeconds) // Convert to positive for calculations
      }

      const days = Math.floor(diffInSeconds / (3600 * 24))
      const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
      const minutes = Math.floor((diffInSeconds % 3600) / 60)
      const seconds = Math.floor(diffInSeconds % 60)
      const result = `${prefix}${days} ${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

      setRemainingTime(result)
    }

    calculateTimeDifference()

    const interval = setInterval(calculateTimeDifference, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [targetDate])

  return <>{remainingTime}</>
}

export default NhubDday
