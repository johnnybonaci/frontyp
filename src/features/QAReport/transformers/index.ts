import {
  type QAReportIndicators,
  type QAReportIndicatorsFromApi,
  type QAReportItem,
  type QAReportItemFromApi,
} from '../types'
import { type Filters } from 'types/filter'
import { type Option } from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import { type QAReportListFiltersFormValues } from 'features/QAReport/components/QAReportFilters/QAReportFilters.tsx'

export const qaReportItemFromApi = (item: QAReportItemFromApi): QAReportItem => {
  return {
    vendorsTd: item.vendors_td,
    buyerId: item.buyer_id,
    buyers: item.buyers,
    phoneId: item.phone_id,
    durations: item.durations,
    oDurations: item.o_durations,
    createdAt: item.created_at,
    offers: item.offers,
    pubListId: item.pub_list_id,
    dateSale: item.date_sale,
    trafficSourceId: item.traffic_source_id,
    adQualityError: item.ad_quality_error,
    notInterested: item.not_interested,
    notQualified: item.not_qualified,
    callDropped: item.call_dropped,
    ivr: item.ivr,
    holdDurations: item.hold_durations,
    oHoldDurations: item.o_hold_durations,
    statusTd: item.status_td,
    reachedAgent: item.reached_agent,
    callerHungUp: item.caller_hung_up,
    state: item.state,
  }
}

export function qaReportIndicatorsFromApi(data: QAReportIndicatorsFromApi): QAReportIndicators {
  return {
    totalCalls: data.total_calls,
    totalReachedAgent: data.total_reached_agent,
    totalReachedAgentQ: data.total_reached_agent_q,
    totalIvr: data.total_ivr,
    totalIvrQ: data.total_ivr_q,
    totalAvgHoldDurations: data.total_avg_hold_durations,
    totalTenHoldDurationsQ: data.total_ten_hold_durations_q,
    totalTenHoldDurations: data.total_ten_hold_durations,
    totalAvgDurations: data.total_avg_durations,
    totalAdQualityError: data.total_ad_quality_error,
    totalCallDropped: data.total_call_dropped,
    totalCallDroppedQ: data.total_call_dropped_q,
    totalNotInterested: data.total_not_interested,
    totalNotInterestedQ: data.total_not_interested_q,
    totalNotQualified: data.total_not_qualified,
    totalNotQualifiedQ: data.total_not_qualified_q,
    totalCallerHungUp: data.total_caller_hung_up,
    totalCallerHungUpQ: data.total_caller_hung_up_q,
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
): QAReportListFiltersFormValues => {
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

export const transformFiltersToUrl = (filters: QAReportListFiltersFormValues): string => {
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
