import { type DateOption } from './types'
import { range, lastNDaysRange } from 'utils/calendarRanges.ts'
import { getCalendarBaseMoment } from 'utils/calendarBase.ts'
const base = getCalendarBaseMoment()

export const DATE_OPTIONS: DateOption[] = [
  {
    text: 'Today',
    key: 'today',
    value: range(base.clone().startOf('day'), base.clone().startOf('day')),
  },
  {
    text: 'Yesterday',
    key: 'yesterday',
    value: range(
      base.clone().subtract(1, 'day').startOf('day'),
      base.clone().subtract(1, 'day').startOf('day')
    ),
  },
  {
    text: 'Today & Yesterday',
    key: 'today_and_yesterday',
    value: range(
      base.clone().subtract(1, 'day').startOf('day'),
      base.clone().startOf('day')
    ),
  },
  {
    text: 'Last 3 days',
    key: 'last_3_days',
    value: lastNDaysRange(3),
  },
  {
    text: 'Last 7 days',
    key: 'last_7_days',
    value: lastNDaysRange(7),
  },
  {
    text: 'Last 30 days',
    key: 'last_30_days',
    value: lastNDaysRange(30),
  },
  {
    text: 'This month',
    key: 'this_month',
    value: range(
      base.clone().startOf('month'),
      base.clone().startOf('day')
    ),
  },
  {
    text: 'Last month',
    key: 'last_month',
    value: range(
      base.clone().subtract(1, 'month').startOf('month'),
      base.clone().subtract(1, 'month').endOf('month').endOf('day')
    ),
  },
]

