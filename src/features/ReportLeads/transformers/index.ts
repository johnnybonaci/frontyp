import { type ReportLeadsItem, type ReportLeadsItemFromApi } from '../types/index'
import { type Filters } from 'types/filter'
import { type ReportLeadsListFiltersFormValues } from 'features/ReportLeads/components/ReportLeadsFilters/ReportLeadsFilters.tsx'
import getDayLimits from 'utils/getDayLimits.ts'
import { dateNoTimezoneToString } from 'utils/dateWithoutTimezone.ts'
import currentDate from 'utils/currentDate.ts'

export const reportLeadsItemFromApi = (item: ReportLeadsItemFromApi): ReportLeadsItem => {
  return {
    dateHistory: item.date_history,
    type: item.type,
    pubId: item.pub_id,
    leads: item.leads,
    leadsDup: item.leads_dup,
    totalLeads: item.total_leads,
    uniqueLeads: item.unique_leads,
  }
}


export const transformFiltersToApi = (filters: Filters): Filters => {

  return {
    date_start: filters.startDate ? dateNoTimezoneToString(filters.startDate) : undefined,
    date_end: filters.endDate ? dateNoTimezoneToString(filters.endDate) : undefined
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): ReportLeadsListFiltersFormValues => {
  const { startOfDay } = getDayLimits()

  return {
    startDate: searchParams.get('date_start') ? currentDate(searchParams.get('date_start')!) : startOfDay,
    endDate: searchParams.get('date_end') ? currentDate(searchParams.get('date_end')!) : startOfDay,
  }
}

export const transformFiltersToUrl = (filters: ReportLeadsListFiltersFormValues): URLSearchParams => {
  const params = new URLSearchParams()


  if (filters.startDate) {
    params.set('date_start', dateNoTimezoneToString(filters.startDate))
  }
  if (filters.endDate) {
    params.set('date_end', dateNoTimezoneToString(filters.endDate))
  }

  return params
}
