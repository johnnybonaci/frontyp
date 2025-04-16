import moment from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants'

const DATE_KEY = 'currentDate'
const NEXT_UPDATE_KEY = 'nextDateUpdate'
const DELAY_KEY = 'currentDateUpdateDelay'

let initialized = false

const IS_TEST = String(import.meta.env.VITE_DATE_MANAGER_TEST).toLowerCase() === 'true'

const getNow = () => moment.tz(DEFAULT_DATE_TIMEZONE).toDate()
const getYesterday = () => moment.tz(DEFAULT_DATE_TIMEZONE).startOf('day').subtract(1, 'day').toDate()

const saveDate = (date: Date) => {
  localStorage.setItem(DATE_KEY, date.toISOString())
}

const saveNextUpdate = (date: Date, delay: number) => {
  localStorage.setItem(NEXT_UPDATE_KEY, date.toISOString())
  localStorage.setItem(DELAY_KEY, delay.toString())
}

const getDelay = () => {
  if (IS_TEST) return 2 * 60 * 1000
  const now = moment.tz(DEFAULT_DATE_TIMEZONE)
  const nextDay = now.clone().add(1, 'day').startOf('day')
  return nextDay.diff(now)
}

const scheduleNextUpdate = (onDateChange?: (newDate: Date) => void) => {
  const delay = getDelay()
  const nextUpdate = new Date(Date.now() + delay)

  saveNextUpdate(nextUpdate, delay)

  console.log(`[${IS_TEST ? 'TEST' : 'LIVE'}] Próxima actualización:`, nextUpdate.toISOString())

  setTimeout(() => {
    const updatedDate = getNow()
    console.log(`[${IS_TEST ? 'TEST' : 'LIVE'}] Actualizando fecha a:`, updatedDate.toISOString())
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
  console.log(`[${IS_TEST ? 'TEST' : 'LIVE'}] Fecha inicial:`, initialDate.toISOString())
  console.log('[TEST] getYesterday (local):', moment(getYesterday()).tz(DEFAULT_DATE_TIMEZONE).format())
  console.log('[TEST] getNow (local):', moment(getNow()).tz(DEFAULT_DATE_TIMEZONE).format())


  scheduleNextUpdate(onDateChange)
}

const currentDate = (): Date => {
  const raw = localStorage.getItem(DATE_KEY)
  return raw ? new Date(raw) : getNow()
}

export default currentDate
