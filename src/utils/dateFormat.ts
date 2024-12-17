import dayjs, { type Dayjs } from 'dayjs'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants.ts'

function dateFormat(
  date: string | Date | number | Dayjs | null | undefined,
  toFormat = 'MM/DD/YYYY',
  fromFormat?: string,
  timeZone: string = DEFAULT_DATE_TIMEZONE
): string {
  if (!date) {
    return ''
  }

  const dateValue: Dayjs = dayjs(date, fromFormat)

  if (dateValue.isValid() && dateValue.format(toFormat) !== 'Invalid date') {
    const toLocalTimezone = new Date(dateValue.format(toFormat)).toLocaleString('en', {
      timeZone,
    })

    return dayjs(toLocalTimezone).format(toFormat)
  }

  return ''
}

export default dateFormat
