import moment from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants.ts'

function dateFromUrl(date: string, timezone: string = DEFAULT_DATE_TIMEZONE): Date {
  return moment.tz(date, timezone).toDate()
}

export default dateFromUrl
