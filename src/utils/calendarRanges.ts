import moment from 'moment-timezone'
import { getCalendarBaseMoment } from 'utils/calendarBase'

/**
 * Devuelve un rango [startDate, endDate] a partir de dos objetos moment
 */
export function range(start: moment.Moment, end: moment.Moment): [Date, Date] {
  return [start.toDate(), end.toDate()]
}

/**
 * Devuelve un rango de los últimos N días hasta el final del día base
 */
export function lastNDaysRange(n: number): [Date, Date] {
  const base = getCalendarBaseMoment()
  return range(
    base.clone().subtract(n, 'days').startOf('day'),
    base.clone().endOf('day')
  )
}