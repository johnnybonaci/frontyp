import {
  type CPAReportIndicators,
  type CPAReportIndicatorsFromApi,
  type CPAReportItem,
  type CPAReportItemFromApi,
} from '../types'
import { type Filters } from 'types/filter'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import {
  type CPAReportListFiltersFormValues,
  DEFAULT_FILTERS,
} from 'features/CPAReport/components/CPAReportFilters/CPAReportFilters.tsx'
import { objectFromUrl } from 'utils/utils.ts'
import getDayLimits from 'utils/getDayLimits.ts'
import { dateNoTimezoneToString } from 'utils/dateWithoutTimezone.ts'
import currentDate from 'utils/currentDate.ts'

export const cpaReportItemFromApi = (item: CPAReportItemFromApi): CPAReportItem => {
  return {
    totalRevenue: item.total_revenue,
    totalCost: item.total_cost,
    variations: item.total_ucr_1,
    totalCalls: item.total_calls,
    totalBillables: item.total_billables,
    totalSales: item.total_sales,
    totalDurations: item.total_durations,
    totalCpa: item.total_cpa,
    totalCpc: item.total_cpc,
    state: item.state,
    totalUcr: item.total_ucr,
    totalUnique: item.total_unique,
    buyerName: item.buyer_name,
    children: item._children?.map(cpaReportItemFromApi),
  }
}

export function cpaReportIndicatorsFromApi(data: CPAReportIndicatorsFromApi): CPAReportIndicators {
  return {
    totalRevenue: data.total_revenue,
    totalCost: data.total_cost,
    totalCalls: data.total_calls,
    totalBillables: data.total_billables,
    totalSales: data.total_sales,
    totalDurations: data.total_durations,
    totalCpa: data.total_cpa,
    totalUcr: data.total_ucr,
    totalUnique: data.total_unique,
    totalCpc: data.total_cpc,
    buyerName: data.buyer_name,
    state: data.state,
  }
}

export const transformFiltersToApi = (filters: Filters): Filters => {
  return {
    pubs_pub1list1id: multipleSelectToApi(filters.pubId),
    leads_state: multipleSelectToApi(filters.state),
    view_by: filters.viewBy?.id,
    leads_type: multipleSelectToApi(filters.leadsType),
    traffic1source1id: multipleSelectToApi(filters.trafficSource),
    date_start: filters.startDate ? dateNoTimezoneToString(filters.startDate) : undefined,
    date_end: filters.endDate ? dateNoTimezoneToString(filters.endDate) : undefined,
    subs_id: filters.subId?.id,
    select_buyers: multipleSelectToApi(filters.buyers, (item) => item.title),
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): CPAReportListFiltersFormValues => {
  const { startOfDay } = getDayLimits()

  return {
    pubId: objectFromUrl(searchParams.get('pubId')),
    state: objectFromUrl(searchParams.get('state')),
    subId: objectFromUrl(searchParams.get('subId'), null),
    viewBy: objectFromUrl(searchParams.get('viewBy'), DEFAULT_FILTERS.viewBy),
    leadsType: objectFromUrl(searchParams.get('leadsType')),
    trafficSource: objectFromUrl(searchParams.get('trafficSource')),
    buyers: objectFromUrl(searchParams.get('buyers')),
    startDate: searchParams.get('date_start')
      ? currentDate(searchParams.get('date_start')!)
      : startOfDay,
    endDate: searchParams.get('date_end') ? currentDate(searchParams.get('date_end')!) : startOfDay,
  }
}

export const transformFiltersToUrl = (filters: CPAReportListFiltersFormValues): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.pubId?.length) {
    params.set('pubId', JSON.stringify(filters.pubId))
  }
  if (filters.state?.length) {
    params.set('state', JSON.stringify(filters.state))
  }
  if (filters.buyers?.length) {
    params.set('buyers', JSON.stringify(filters.buyers))
  }
  if (filters.leadsType?.length) {
    params.set('leadsType', JSON.stringify(filters.leadsType))
  }
  if (filters.trafficSource?.length) {
    params.set('trafficSource', JSON.stringify(filters.trafficSource))
  }

  if (filters.viewBy) {
    params.set('subId', JSON.stringify(filters.subId))
  }

  if (filters.subId) {
    params.set('subId', JSON.stringify(filters.subId))
  }
  if (filters.startDate) {
    params.set('date_start', dateNoTimezoneToString(filters.startDate))
  }
  if (filters.endDate) {
    params.set('date_end', dateNoTimezoneToString(filters.endDate))
  }

  return params
}
