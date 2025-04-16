import currentDate from 'utils/currentDate.ts'

export default function getDayLimits(): { startOfDay: Date; endOfDay: Date } {
  console.log('getDayLimits ->' + currentDate())
  return {
    startOfDay: currentDate(),
    endOfDay: currentDate(),
  }
}
