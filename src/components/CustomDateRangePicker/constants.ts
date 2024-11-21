import moment from 'moment'
import { DateOption } from './types'

export const DATE_OPTIONS: DateOption[] = [
  {
    text: 'Today',
    key: 'today',
    value: [moment().startOf('date').toDate(), moment().endOf('date').toDate()],
  },
  {
    text: 'Yesterday',
    key: 'yesterday',
    value: [
      moment().subtract(1, 'days').startOf('date').toDate(),
      moment().subtract(1, 'days').endOf('date').toDate(),
    ],
  },
  {
    text: 'Today & Yesterday',
    key: 'today_and_yesterday',
    value: [moment().subtract(1, 'days').toDate(), moment().toDate()],
  },
  {
    text: 'Last 3 days',
    key: 'last_3_days',
    value: [moment().subtract(3, 'days').toDate(), moment().toDate()],
  },
  {
    text: 'Last 7 days',
    key: 'last_7_days',
    value: [moment().subtract(7, 'days').toDate(), moment().toDate()],
  },
  {
    text: 'Last 30 days',
    key: 'last_30_days',
    value: [moment().subtract(30, 'days').toDate(), moment().toDate()],
  },
  {
    text: 'This month',
    key: 'this_month',
    value: [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
  },
  {
    text: 'Last month',
    key: 'last_month',
    value: [
      moment().subtract(1, 'month').startOf('month').toDate(),
      moment().subtract(1, 'month').endOf('month').toDate(),
    ],
  },
]
