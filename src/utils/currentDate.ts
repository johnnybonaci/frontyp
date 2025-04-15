import moment from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants'

const DATE_KEY = 'currentDate'
const NEXT_UPDATE_KEY = 'nextDateUpdate'
let initialized = false

const getNow = () => moment.tz(DEFAULT_DATE_TIMEZONE).toDate()

const saveDate = (date: Date) => {
  localStorage.setItem(DATE_KEY, date.toISOString())
}

const scheduleNextUpdate = () => {
  const now = moment.tz(DEFAULT_DATE_TIMEZONE)
  const nextDay = now.clone().add(1, 'day').startOf('day')
  const delay = nextDay.diff(now)

  localStorage.setItem(NEXT_UPDATE_KEY, nextDay.toISOString())

  setTimeout(() => {
    const updatedDate = getNow()
    saveDate(updatedDate)
    scheduleNextUpdate()
  }, delay)
}

export const initCurrentDate = () => {
  if (initialized) return
  initialized = true

  const stored = localStorage.getItem(DATE_KEY)
  if (!stored) {
    saveDate(getNow())
  }

  scheduleNextUpdate()
}

const currentDate = (): Date => {
  const raw = localStorage.getItem(DATE_KEY)
  return raw ? new Date(raw) : getNow()
}

export default currentDate
