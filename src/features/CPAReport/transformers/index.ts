import {
  type CPAReportIndicators,
  type CPAReportIndicatorsFromApi,
  type CPAReportItem,
  type CPAReportItemFromApi,
} from '../types'
import { type Filters } from 'types/filter'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import { type CPAReportListFiltersFormValues } from 'features/CPAReport/components/CPAReportFilters/CPAReportFilters.tsx'
import { objectFromUrl } from 'utils/utils.ts'

export const cpaReportItemFromApi = (item: CPAReportItemFromApi): CPAReportItem => {
  return {
    totalRevenue: item.total_revenue,
    totalCost: item.total_cost,
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
    leads_type: multipleSelectToApi(filters.leadsType),
    traffic1source1id: multipleSelectToApi(filters.trafficSource),
    date_start: filters.startDate?.toISOString().slice(0, 10),
    date_end: filters.endDate?.toISOString().slice(0, 10),
    subs_id: filters.subId?.id,
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): CPAReportListFiltersFormValues => {
  return {
    pubId: objectFromUrl(searchParams.get('pubId')),
    state: objectFromUrl(searchParams.get('state')),
    subId: objectFromUrl(searchParams.get('subId'), null),
    leadsType: objectFromUrl(searchParams.get('leadsType')),
    trafficSource: objectFromUrl(searchParams.get('trafficSource')),
    buyers: objectFromUrl(searchParams.get('buyers')),
    startDate: searchParams.get('date_start') ? new Date(searchParams.get('date_start')!) : null,
    endDate: searchParams.get('date_end') ? new Date(searchParams.get('date_end')!) : null,
  }
}

export const transformFiltersToUrl = (filters: CPAReportListFiltersFormValues): string => {
  const params = new URLSearchParams()
  console.log(filters)

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

  if (filters.subId) {
    params.set('subId', JSON.stringify(filters.subId))
  }
  if (filters.startDate) {
    params.set('date_start', filters.startDate.toISOString())
  }
  if (filters.endDate) {
    params.set('date_end', filters.endDate.toISOString())
  }

  return params.toString()
}
