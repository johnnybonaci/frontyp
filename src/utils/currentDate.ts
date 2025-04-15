import moment from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants'

const DATE_KEY = 'currentDate'
const NEXT_UPDATE_KEY = 'nextDateUpdate'
let initialized = false

const IS_TEST = import.meta.env.VITE_DATE_MANAGER_TEST === 'true'

const getNow = () => moment.tz(DEFAULT_DATE_TIMEZONE).toDate()
const getYesterday = () => moment.tz(DEFAULT_DATE_TIMEZONE).subtract(1, 'day').toDate()

const saveDate = (date: Date) => {
  localStorage.setItem(DATE_KEY, date.toISOString())
}

const saveNextUpdate = (nextDate: Date, delay: number) => {
  localStorage.setItem(NEXT_UPDATE_KEY, nextDate.toISOString())
  localStorage.setItem('currentDateUpdateDelay', delay.toString())
}

const getDelay = () => {
  if (IS_TEST) return 5 * 60 * 1000
  const now = moment.tz(DEFAULT_DATE_TIMEZONE)
  const nextDay = now.clone().add(1, 'day').startOf('day')
  return nextDay.diff(now)
}

const scheduleNextUpdate = (onDateChange?: (newDate: Date) => void) => {
  const delay = getDelay()
  const nextUpdate = new Date(Date.now() + delay)
  saveNextUpdate(nextUpdate, delay)

  setTimeout(() => {
    const updatedDate = getNow()
    saveDate(updatedDate)
    if (onDateChange) onDateChange(updatedDate)
    scheduleNextUpdate(onDateChange)
  }, delay)
}

export const initCurrentDate = (onDateChange?: (newDate: Date) => void) => {
  if (initialized) return
  initialized = true

  const initialDate = IS_TEST ? getYesterday() : getNow()
  saveDate(initialDate)

  scheduleNextUpdate(onDateChange)
}

const currentDate = (): Date => {
  const raw = localStorage.getItem(DATE_KEY)
  return raw ? new Date(raw) : getNow()
}

export default currentDate
