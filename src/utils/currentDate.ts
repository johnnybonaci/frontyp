import moment, { type Moment } from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants.ts'

function currentDate(timezone: string = DEFAULT_DATE_TIMEZONE): Date {
  const date: Moment = moment.tz(timezone)

  const year = date.year()
  const month = date.month()
  const day = date.date()
  const hours = date.hour()
  const minutes = date.minute()
  const seconds = date.second()

  const newDate = moment.tz(
    { year, month, day, hours, minutes, seconds },
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  return new Date(newDate.toISOString())
}

export default currentDate
