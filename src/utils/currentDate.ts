import moment, { type Moment } from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants.ts'

const STORAGE_DATE_KEY = 'last_known_date'
const STORAGE_DATETIME_KEY = 'last_known_datetime'

function currentDate(timezone: string = DEFAULT_DATE_TIMEZONE): Date {
  const now: Moment = moment.tz(timezone)
  const todayStr = now.format('YYYY-MM-DD')

  const lastStoredDateStr = localStorage.getItem(STORAGE_DATE_KEY)
  const lastStoredDatetimeISO = localStorage.getItem(STORAGE_DATETIME_KEY)

  const dayChanged = lastStoredDateStr !== todayStr

  if (dayChanged) {
    localStorage.setItem(STORAGE_DATE_KEY, todayStr)
    localStorage.setItem(STORAGE_DATETIME_KEY, now.toISOString())
    console.log('Cambio de día detectado:', lastStoredDateStr, '->', todayStr)
  }
  else {
    console.log('No hay cambio de día:', lastStoredDateStr, '->', todayStr)
  }

  const baseMoment: Moment = lastStoredDatetimeISO
    ? moment.tz(lastStoredDatetimeISO, timezone)
    : now

  const year = baseMoment.year()
  const month = baseMoment.month()
  const day = baseMoment.date()
  const hours = baseMoment.hour()
  const minutes = baseMoment.minute()
  const seconds = baseMoment.second()

  const finalDate = moment.tz(
    { year, month, day, hours, minutes, seconds },
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  return new Date(finalDate.toISOString())
}

export default currentDate
