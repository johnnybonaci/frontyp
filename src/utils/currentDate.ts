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
  const diffMs = nextDay.diff(now)

  console.log('[LIVE] 🕐 Hora actual (local):', now.format('YYYY-MM-DD HH:mm:ss'))
  console.log('[LIVE] 🕛 Ejecutar en:', Math.floor(diffMs / 60000), 'minutos')

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

  console.log(`[${IS_TEST ? 'TEST' : 'LIVE'}] 🕒 Ahora (local):`, now.format('YYYY-MM-DD HH:mm:ss'))
  console.log(`[${IS_TEST ? 'TEST' : 'LIVE'}] 🗓 Próxima actualización (local):`, moment(nextUpdate).format('YYYY-MM-DD HH:mm:ss'))

  setTimeout(() => {
    const updatedDate = moment.tz(DEFAULT_DATE_TIMEZONE).startOf('day').toDate()
    console.log(`[${IS_TEST ? 'TEST' : 'LIVE'}] 🔁 Actualizando fecha a (UTC):`, updatedDate.toISOString())
    console.log(`[${IS_TEST ? 'TEST' : 'LIVE'}] 🔁 Actualizando fecha (local):`, moment(updatedDate).format('YYYY-MM-DD HH:mm:ss'))

    saveDate(updatedDate)
    if (onDateChange) onDateChange(updatedDate)
    scheduleNextUpdate(onDateChange)
  }, delay)
}


const initCurrentDate = (onDateChange?: (newDate: Date) => void) => {
  if (initialized) return
  initialized = true

  const initialDate = IS_TEST ? getYesterday() : getNow()
  saveDate(initialDate)

  console.log(`[${IS_TEST ? 'TEST' : 'LIVE'}] 🚀 Fecha inicial (UTC):`, initialDate.toISOString())
  console.log(`[${IS_TEST ? 'TEST' : 'LIVE'}] 🚀 Fecha inicial (local):`, moment(initialDate).format('YYYY-MM-DD HH:mm:ss'))

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
