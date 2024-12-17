import currentDate from 'utils/currentDate.ts'

export default function getDayLimits(): { startOfDay: Date; endOfDay: Date } {
  return {
    startOfDay: currentDate(),
    endOfDay: currentDate(),
  }
}
