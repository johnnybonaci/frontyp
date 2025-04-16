import moment from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants'

const DATE_KEY = 'currentDate'
const NEXT_UPDATE_KEY = 'nextDateUpdate'
const DELAY_KEY = 'currentDateUpdateDelay'

let initialized = false

const IS_TEST = String(import.meta.env.VITE_DATE_MANAGER_TEST).toLowerCase() === 'true'

const getNow = () => moment.tz(DEFAULT_DATE_TIMEZONE).startOf('day').toDate()

const getYesterday = () => moment.tz(DEFAULT_DATE_TIMEZONE).startOf('day').subtract(2, 'day').toDate()

const getDelay = () => {
  if (IS_TEST) return 2 * 60 * 1000

  const now = moment.tz(DEFAULT_DATE_TIMEZONE)
  const nextDay = now.clone().add(1, 'day').startOf('day')
  const diffMs = nextDay.diff(now) + 120000

  return diffMs
}

const saveDate = (date: Date) => {
  const dayStr = moment(date).tz(DEFAULT_DATE_TIMEZONE).format('YYYY-MM-DD')
  localStorage.setItem(DATE_KEY, dayStr)
}

const saveNextUpdate = (date: Date, delay: number) => {
  localStorage.setItem(NEXT_UPDATE_KEY, moment(date).format('YYYY-MM-DD HH:mm:ss'))
  localStorage.setItem(DELAY_KEY, delay.toString())
}

const scheduleNextUpdate = (onDateChange?: (newDate: Date) => void) => {
  const delay = getDelay()

  const now = moment.tz(DEFAULT_DATE_TIMEZONE)
  const nextUpdate = now.clone().add(delay, 'milliseconds').toDate()

  saveNextUpdate(nextUpdate, delay)

  setTimeout(() => {
    const updatedDate = moment.tz(DEFAULT_DATE_TIMEZONE).startOf('day').toDate()

    saveDate(updatedDate)
    if (onDateChange) onDateChange(updatedDate)
    scheduleNextUpdate(onDateChange)
    window.location.reload()

  }, delay)
}


const initCurrentDate = (onDateChange?: (newDate: Date) => void) => {
  if (initialized) return
  initialized = true

  const initialDate = IS_TEST ? getYesterday() : getNow()
  saveDate(initialDate)
  scheduleNextUpdate(onDateChange)
}

const currentDate = (): Date => {
  const raw = localStorage.getItem(DATE_KEY)
  return raw
    ? moment.tz(raw, 'YYYY-MM-DD', DEFAULT_DATE_TIMEZONE).toDate()
    : getNow()
}
export {
  initCurrentDate,
  IS_TEST,
  getYesterday,
  saveDate,
}

export default currentDate
