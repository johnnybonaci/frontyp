import dayjs, { type Dayjs } from 'dayjs'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants.ts'

function dateTimeFormat(
  dateTime: string | Date | number | Dayjs | null | undefined,
  toFormat = 'MM/DD/YYYY HH:mm',
  fromFormat?: string,
  timeZone: string = DEFAULT_DATE_TIMEZONE
): string {
  if (!dateTime) {
    return ''
  }

  const dateTimeValue: Dayjs = dayjs(dateTime, fromFormat)

  if (dateTimeValue.isValid() && dateTimeValue.format(toFormat) !== 'Invalid date') {
    const toLocalTimezone = new Date(dateTimeValue.format(toFormat)).toLocaleString('en', {
      timeZone,
    })
    return `${dayjs(toLocalTimezone).format(toFormat)}`
  }

  return ''
}

export default dateTimeFormat
