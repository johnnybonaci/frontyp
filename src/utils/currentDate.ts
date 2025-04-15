import moment from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants'

const DATE_KEY = 'currentDate'
const NEXT_UPDATE_KEY = 'nextDateUpdate'
let initialized = false

const IS_TEST = import.meta.env.VITE_DATE_MANAGER_TEST === 'false'

const getNow = () => moment.tz(DEFAULT_DATE_TIMEZONE).toDate()
const getYesterday = () => moment.tz(DEFAULT_DATE_TIMEZONE).subtract(1, 'day').toDate()

const saveDate = (date: Date) => {
  localStorage.setItem(DATE_KEY, date.toISOString())
}

const saveNextUpdate = (nextDate: Date) => {
  localStorage.setItem(NEXT_UPDATE_KEY, nextDate.toISOString())
}

const getDelay = () => {
  if (IS_TEST) return 2 * 60 * 1000
  const now = moment.tz(DEFAULT_DATE_TIMEZONE)
  const nextDay = now.clone().add(1, 'day').startOf('day')
  return nextDay.diff(now)
}

const scheduleNextUpdate = () => {
  const delay = getDelay()
  const nextUpdate = new Date(Date.now() + delay)
  saveNextUpdate(nextUpdate)
  localStorage.setItem('Delay', delay.toString())

  setTimeout(() => {
    const updatedDate = getNow()
    console.log(`[${IS_TEST ? 'TEST' : 'LIVE'}] Actualizando fecha a:`, updatedDate.toISOString())
    saveDate(updatedDate)
    scheduleNextUpdate()
  }, delay)
}

export const initCurrentDate = () => {
  if (initialized) return
  initialized = true

  const initialDate = IS_TEST ? getYesterday() : getNow()
  saveDate(initialDate)
  console.log(`[${IS_TEST ? 'TEST' : 'LIVE'}] Fecha inicial:`, initialDate.toISOString())

  scheduleNextUpdate()
}

const currentDate = (): Date => {
  const raw = localStorage.getItem(DATE_KEY)
  return raw ? new Date(raw) : getNow()
}

export default currentDate
