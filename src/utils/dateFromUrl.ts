import moment, { type Moment } from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants.ts'

function dateFromUrl(date: string, timezone: string = DEFAULT_DATE_TIMEZONE): Date {
  const parsedDate: Moment = moment.tz(date, timezone)

  const year = parsedDate.year()
  const month = parsedDate.month()
  const day = parsedDate.date()
  const hours = parsedDate.hour()
  const minutes = parsedDate.minute()
  const seconds = parsedDate.second()

  const newDate = moment.tz(
    { year, month, day, hours, minutes, seconds },
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  return new Date(newDate.toISOString())
}

export default dateFromUrl
