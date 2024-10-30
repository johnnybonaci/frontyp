import {
  type CPAReportIndicators,
  type CPAReportIndicatorsFromApi,
  type CPAReportItem,
  type CPAReportItemFromApi,
} from '../types'
import { type Filters } from 'types/filter'
import { type Option } from 'components/MultiSelect/MultiSelect.tsx'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import { type CPAReportListFiltersFormValues } from 'features/CPAReport/components/CPAReportFilters/CPAReportFilters.tsx'

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
  const filter = []

  if (filters.phone) {
    filter.push({
      field: 'phone_id',
      type: 'like',
      value: filters.phone,
    })
  }

  if (filters.didTd) {
    filter.push({
      field: 'did_number_id',
      type: 'like',
      value: filters.didTd,
    })
  }

  if (filters.didTd) {
    filter.push({
      field: 'terminating_phone',
      type: 'like',
      value: filters.terminatingPhone,
    })
  }

  return {
    convertions_offer1id: multipleSelectToApi(filters.offers),
    pubs_pub1list1id: multipleSelectToApi(filters.pubId),
    select_states: multipleSelectToApi(filters.state),
    convertions_traffic1source1id: filters.trafficSource,
    date_start: filters.startDate?.toISOString().slice(0, 10),
    date_end: filters.endDate?.toISOString().slice(0, 10),
    convertions_status: filters.status,
    convertions_phone1id: '',
    phone: filters.phone,
    subs_id: multipleSelectToApi(filters.subId),
    select_buyers: multipleSelectToApi(filters.buyers),
    convertions_id: '',
    recordings_status: '',
    select_issues_types: multipleSelectToApi(filters.issueType),
    recordings_billable: '',
    recordings_insurance: filters.insurance,
    call_issues: filters.callIssues,
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): CPAReportListFiltersFormValues => {
  const parseOptions = (param: string | null): Option[] => {
    if (!param) return []
    try {
      return JSON.parse(param)
    } catch (error) {
      console.warn(`Error parsing JSON: ${param}. Error: ${error}`)
      return []
    }
  }

  return {
    pubId: parseOptions(searchParams.get('pubId')),
    state: parseOptions(searchParams.get('state')),
    subId: parseOptions(searchParams.get('subId')),
    trafficSource: parseOptions(searchParams.get('trafficSource')),
    buyers: parseOptions(searchParams.get('buyers')),
    startDate: searchParams.get('date_start') ? new Date(searchParams.get('date_start')!) : null,
    endDate: searchParams.get('date_end') ? new Date(searchParams.get('date_end')!) : null,
  }
}

export const transformFiltersToUrl = (filters: CPAReportListFiltersFormValues): string => {
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
  if (filters.trafficSource?.length) {
    params.set('trafficSource', JSON.stringify(filters.trafficSource))
  }
  if (filters.subId?.length) {
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
