import { type Filters } from 'types/filter'
import { type LeadReportListFiltersFormValues } from 'features/LeadReport/components/LeadReportFilters/LeadReportFilters.tsx'
import getDayLimits from 'utils/getDayLimits.ts'
import { type LeadReportItem, type LeadReportItemFromApi } from 'features/LeadReport/types'
import { dateNoTimezoneToString } from 'utils/dateWithoutTimezone.ts'
import dateFromUrl from 'utils/dateFromUrl.ts'

export const leadReportItemFromApi = (item: LeadReportItemFromApi): LeadReportItem => {
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
): LeadReportListFiltersFormValues => {
  const { startOfDay } = getDayLimits()

  return {
    startDate: searchParams.get('date_start') ? dateFromUrl(searchParams.get('date_start')!) : startOfDay,
    endDate: searchParams.get('date_end') ? dateFromUrl(searchParams.get('date_end')!) : startOfDay,
  }
}

export const transformFiltersToUrl = (
  filters: LeadReportListFiltersFormValues
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.startDate) {
    params.set('date_start', dateNoTimezoneToString(filters.startDate))
  }
  if (filters.endDate) {
    params.set('date_end', dateNoTimezoneToString(filters.endDate))
  }

  return params
}
