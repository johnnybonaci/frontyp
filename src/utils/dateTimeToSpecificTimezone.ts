import moment, { type Moment } from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants.ts'

function dateTimeToSpecificTimezone(
  dateTime: string,
  timezone: string = DEFAULT_DATE_TIMEZONE
): string | undefined {
  if (!dateTime) {
    return undefined
  }

  const dateTimeValue: Moment = moment(dateTime)

  if (dateTimeValue.isValid() && dateTimeValue.format() !== 'Invalid date') {
    const year = dateTimeValue.year()
    const month = dateTimeValue.month()
    const day = dateTimeValue.date()
    const hours = dateTimeValue.hour()
    const minutes = dateTimeValue.minute()
    const seconds = dateTimeValue.second()

    const newDate = moment.tz({ year, month, day, hours, minutes, seconds }, timezone)

    return newDate.toISOString()
  }

  return undefined
}

export default dateTimeToSpecificTimezone
