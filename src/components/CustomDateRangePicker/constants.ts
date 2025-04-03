import moment from 'moment'
import { type DateOption } from './types'
import dateFromUrl from 'utils/dateFromUrl.ts'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants.ts'

export const DATE_OPTIONS: DateOption[] = [
  {
    text: 'Today',
    key: 'today',
    value: [
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).startOf('date').format()),
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).endOf('date').format()),
    ],
  },
  {
    text: 'Yesterday',
    key: 'yesterday',
    value: [
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).subtract(1, 'days').startOf('date').format()),
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).subtract(1, 'days').endOf('date').format()),
    ],
  },
  {
    text: 'Today & Yesterday',
    key: 'today_and_yesterday',
    value: [
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).subtract(1, 'days').format()),
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).format()),
    ],
  },
  {
    text: 'Last 3 days',
    key: 'last_3_days',
    value: [
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).subtract(3, 'days').format()),
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).format()),
    ],
  },
  {
    text: 'Last 7 days',
    key: 'last_7_days',
    value: [
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).subtract(7, 'days').format()),
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).format()),
    ],
  },
  {
    text: 'Last 30 days',
    key: 'last_30_days',
    value: [
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).subtract(30, 'days').format()),
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).format()),
    ],
  },
  {
    text: 'This month',
    key: 'this_month',
    value: [
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).startOf('month').format()),
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).endOf('month').format()),
    ],
  },
  {
    text: 'Last month',
    key: 'last_month',
    value: [
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).subtract(1, 'month').startOf('month').format()),
      dateFromUrl(moment.tz(DEFAULT_DATE_TIMEZONE).subtract(1, 'month').endOf('month').format()),
    ],
  },
]
