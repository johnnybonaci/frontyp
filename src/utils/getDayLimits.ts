import moment from 'moment'

export default function getDayLimits(): { startOfDay: Date; endOfDay: Date } {
  return {
    startOfDay: moment().startOf('date').toDate(),
    endOfDay: moment().endOf('date').toDate(),
  }
}
