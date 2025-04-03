import moment, { type Moment } from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants.ts'
import dateTimeToSpecificTimezone from 'utils/dateTimeToSpecificTimezone.ts'

function dateTimeToPickerValue(dateTime: any, timeZone: string = DEFAULT_DATE_TIMEZONE): string {
  if (!dateTime) {
    return ''
  }

  const dateTimeValue: Moment = moment(dateTime)

  if (dateTimeValue.isValid() && dateTimeValue.format() !== 'Invalid date') {
    const year = dateTimeValue.year()
    const month = dateTimeValue.month()
    const day = dateTimeValue.date()
    const hours = dateTimeValue.hour()
    const minutes = dateTimeValue.minute()
    const seconds = dateTimeValue.second()

    const date = moment(new Date(year, month, day, hours, minutes, seconds).toISOString()).tz(
      timeZone
    )

    return new Date(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dateTimeToSpecificTimezone(date, Intl.DateTimeFormat().resolvedOptions().timeZone)
    ).toISOString()
  }

  return ''
}

export default dateTimeToPickerValue
