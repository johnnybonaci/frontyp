import moment, { type Moment } from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants'

const STORAGE_DATE_KEY = 'calendar_last_known_date'
const STORAGE_DATETIME_KEY = 'calendar_last_known_datetime'

/**
 * Devuelve un objeto Moment base que se actualiza automáticamente si el día ha cambiado.
 * Persiste la fecha base en localStorage.
 */
export function getCalendarBaseMoment(timezone: string = DEFAULT_DATE_TIMEZONE): Moment {
  const now = moment.tz(timezone)
  const todayStr = now.format('YYYY-MM-DD')

  const lastDateStr = localStorage.getItem(STORAGE_DATE_KEY)
  const lastDateTime = localStorage.getItem(STORAGE_DATETIME_KEY)

  const dayChanged = lastDateStr !== todayStr

  if (dayChanged || !lastDateTime) {
    localStorage.setItem(STORAGE_DATE_KEY, todayStr)
    localStorage.setItem(STORAGE_DATETIME_KEY, now.toISOString())
    return now
  }

  return moment.tz(lastDateTime, timezone)
}