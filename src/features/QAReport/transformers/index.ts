import {
  type QAReportIndicators,
  type QAReportIndicatorsFromApi,
  type QAReportItem,
  type QAReportItemFromApi,
} from '../types'
import { type Filters } from 'types/filter'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import { type QAReportListFiltersFormValues } from 'features/QAReport/components/QAReportFilters/QAReportFilters.tsx'
import { objectFromUrl } from 'utils/utils.ts'
import getDayLimits from 'utils/getDayLimits.ts'

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

  return {
    convertions_offer1id: multipleSelectToApi(filters.offers),
    select_buyers: multipleSelectToApi(filters.buyers),
    traffic1source1id: multipleSelectToApi(filters.trafficSource),
    pubs_pub1list1id: multipleSelectToApi(filters.pubId),
    subs_id: filters.subId?.id,
    date_start: filters.startDate?.toISOString().slice(0, 10),
    date_end: filters.endDate?.toISOString().slice(0, 10),
    phone: filters.phone,
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
    recordings_insurance: filters.insurance,
    select_states: multipleSelectToApi(filters.state),
    call_issues: filters.callIssues,
    convertions_status: filters.status,
    select_issues_types: multipleSelectToApi(filters.issueType),
    leads_sub1id5: multipleSelectToApi(filters.pubIdYp),
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): QAReportListFiltersFormValues => {
  const { startOfDay, endOfDay } = getDayLimits()

  return {
    offers: objectFromUrl(searchParams.get('offers')),
    buyers: objectFromUrl(searchParams.get('buyers')),
    trafficSource: objectFromUrl(searchParams.get('trafficSource')),
    pubId: objectFromUrl(searchParams.get('pubId')),
    subId: objectFromUrl(searchParams.get('subId'), null),
    phone: searchParams.get('phone') ?? '',
    startDate: searchParams.get('date_start')
      ? new Date(searchParams.get('date_start')!)
      : startOfDay,
    endDate: searchParams.get('date_end') ? new Date(searchParams.get('date_end')!) : endOfDay,
    insurance: searchParams.get('insurance') ?? '',
    state: objectFromUrl(searchParams.get('state')),
    callIssues: searchParams.get('callIssues') ?? '',
    status: searchParams.get('status') ?? '',
    issueType: objectFromUrl(searchParams.get('issueType')),
    pubIdYp: objectFromUrl(searchParams.get('pubIdYp')),
  }
}

export const transformFiltersToUrl = (filters: QAReportListFiltersFormValues): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.pubId?.length) {
    params.set('pubId', JSON.stringify(filters.pubId))
  }
  if (filters.offers?.length) {
    params.set('offers', JSON.stringify(filters.offers))
  }
  if (filters.phone) {
    params.set('phone', filters.phone)
  }
  if (filters.buyers?.length) {
    params.set('buyers', JSON.stringify(filters.buyers))
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
  if (filters.insurance) {
    params.set('insurance', filters.insurance)
  }
  if (filters.state?.length) {
    params.set('state', JSON.stringify(filters.state))
  }
  if (filters.status) {
    params.set('status', filters.status)
  }
  if (filters.issueType?.length) {
    params.set('issueType', JSON.stringify(filters.issueType))
  }
  if (filters.pubIdYp?.length) {
    params.set('pubIdYp', JSON.stringify(filters.pubIdYp))
  }
  if (filters.callIssues) {
    params.set('callIssues', filters.callIssues)
  }

  return params
}
