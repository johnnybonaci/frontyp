import { type Filters } from 'types/filter'
import { type HistoryLeadsListFiltersFormValues } from 'features/HistoryLeads/components/HistoryLeadsFilters/HistoryLeadsFilters.tsx'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import getDayLimits from 'utils/getDayLimits.ts'
import { type HistoryLeadsItem, type HistoryLeadsItemFromApi } from 'features/HistoryLeads/types'
import { dateNoTimezoneToString } from 'utils/dateWithoutTimezone.ts'
import dateFromUrl from 'utils/dateFromUrl.ts'

export const historyLeadsItemFromApi = (item: HistoryLeadsItemFromApi): HistoryLeadsItem => {
  return {

    data: item.data,
    phone: item.phone,
    last_update: item.last_update,
    date_created: item.date_created

  }
}

export const transformFiltersToApi = (filters: Filters): Filters => {
  const filter = []

  if (filters.phone) {
    filter.push({
      field: 'phone_id',
      type: 'like',
      value: filters.phone,
    })
  }


  return {
    date_start: filters.startDate ? dateNoTimezoneToString(filters.startDate) : undefined,
    date_end: filters.endDate ? dateNoTimezoneToString(filters.endDate) : undefined,
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): HistoryLeadsListFiltersFormValues => {
  const { startOfDay } = getDayLimits()

  return {

    startDate: searchParams.get('date_start')
      ? dateFromUrl(searchParams.get('date_start')!)
      : startOfDay,
    endDate: searchParams.get('date_end') ? dateFromUrl(searchParams.get('date_end')!) : startOfDay,
    phone: searchParams.get('phone_id') ?? ''
  }
}

export const transformFiltersToUrl = (
  filters: HistoryLeadsListFiltersFormValues
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.startDate) {
    params.set('date_start', dateNoTimezoneToString(filters.startDate))
  }
  if (filters.endDate) {
    params.set('date_end', dateNoTimezoneToString(filters.endDate))
  }
  if (filters.phone) {
    params.set('phone_id', filters.phone)
  }

  return params
}
