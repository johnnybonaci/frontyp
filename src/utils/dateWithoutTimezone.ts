import moment from 'moment'

export function dateNoTimezoneToString(date: Date): string {
  return moment(date).format('YYYY-MM-DD')
}

export function stringDateNoTimezoneToDate(date: string): Date {
  return moment(date).toDate()
}
