import {
  type CallEndingSoonerReasonFromApi,
  type CallReportAverageFromApi,
  type CallReportAverages,
  type CallReportItem,
  type CallReportItemFromApi,
  type CallReportMultiple,
  type CallReportMultipleFromApi,
  type CallReportPercentages,
  type CallReportPercentagesFromApi,
  type StatusT,
  type StatusTValue,
} from '../types'
import { indicatorFromApi } from 'hooks/indicator.ts'
import { type Filters } from 'types/filter'
import { type CallReportListFiltersFormValues } from 'features/CallReport/components/CallReportFilters/CallReportFilters.tsx'
import { type Option } from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import getDayLimits from 'utils/getDayLimits.ts'

export const statusTFromApi = (status: StatusTValue): StatusT => {
  return {
    value: status,
    isFailed: status === 4,
    isProcessed: status === 1,
    isTranscribing: status === 3,
    isAvailableToDownload: status === 2,
  }
}

export const callReportItemFromApi = (item: CallReportItemFromApi): CallReportItem => {
  return {
    id: item.id,
    url: item.url,
    transcript: item.transcript,
    billable: item.billable,
    statusT: statusTFromApi(item.status_t),
    multiple: item.multiple ? callReportMultipleFromApi(item.multiple) : undefined,
    didNumberId: item.did_number_id,
    cpl: item.cpl,
    vendorsTd: item.vendors_td,
    status: item.status,
    buyerId: item.buyer_id,
    pubIdYp: item.sub_id5,
    issueType: item.call_ending_sooner_reason,
    buyers: item.buyers,
    revenue: item.revenue,
    phoneId: item.phone_id,
    terminatingPhone: item.terminating_phone,
    durations: item.durations,
    createdAt: item.created_at,
    offers: item.offers,
    offerId: item.offer_id,
    pubListId: item.pub_list_id,
    dateSale: item.date_sale,
    calls: item.calls,
    converted: item.converted,
    trafficSourceId: item.traffic_source_id,
    insurance: item.insurance,
    insuranceValue: item.insurance_value,
    insuranceName: item.insurance_name,
    state: item.state,
  }
}

export function callReportAveragesFromApi(data: CallReportAverageFromApi): CallReportAverages {
  return {
    totalSpend: indicatorFromApi(data.total_spend),
    totalRevenue: indicatorFromApi(data.total_revenue),
    totalProfit: indicatorFromApi(data.total_profit),
    totalRoi: indicatorFromApi(data.total_roi),
    totalConversion: indicatorFromApi(data.total_conversion),
    totalLeadsToCall: indicatorFromApi(data.total_leads_to_call),
    totalLeads: indicatorFromApi(data.total_leads),
    totalCalls: indicatorFromApi(data.total_calls),
    totalAnswered: indicatorFromApi(data.total_answered),
    totalBillable: indicatorFromApi(data.total_billable),
    totalAnsweredToBillable: indicatorFromApi(data.total_answered_to_billable),
    totalCallsToAnswered: indicatorFromApi(data.total_calls_to_answered),
    totalCpl: indicatorFromApi(data.total_cpl),
    totalCpc: indicatorFromApi(data.total_cpc),
    totalCps: indicatorFromApi(data.total_cps),
    totalRpl: indicatorFromApi(data.total_rpl),
    totalRpc: indicatorFromApi(data.total_rpc),
    totalRps: indicatorFromApi(data.total_rps),
    totalSpendLeads: indicatorFromApi(data.total_spend_leads),
    totalSpendCalls: indicatorFromApi(data.total_spend_calls),
    totalUniqueCalls: indicatorFromApi(data.total_unique_calls),
  }
}

export function callReportMultipleFromApi(data: CallReportMultipleFromApi): CallReportMultiple {
  return {
    data: data.data || '',
    callIssues: data.call_issues || '',
    mistreatment: data.mistreatment || '',
    personalData: data.personal_data || '',
    saleAnalysis: data.sale_analysis || '',
    callIssuesResult: data.call_issues_result || '',
    existingInsurance: data.existing_insurance || '',
    sentimentAnalysis: data.sentiment_analysis || '',
    mistreatmentResult: data.mistreatment_result || '',
    callEndingAnalysis: data.call_ending_analysis || '',
    saleAnalysisResult: data.sale_analysis_result || '',
    saleAnalysisDetails: data.sale_analysis_details || '',
    existingInsuranceName: data.existing_insurance_name ?? null,
    callEndingSoonerResult: data.call_ending_sooner_result,
    existingInsuranceResult: data.existing_insurance_result || '',
    callEndingSoonerReasons: (data.call_ending_sooner_reasons || []).map(
      (reason: CallEndingSoonerReasonFromApi) => ({
        reason: reason.reason || '',
        category: reason.category || '',
      })
    ),
    conversationEffectiveness: data.conversation_effectiveness || '',
    leadTypeAndParticipants: data.lead_type_and_participants || '',
    preQualificationAnalysis: data.pre_qualification_analysis || '',
    conversationEffectivenessResult: data.conversation_effectiveness_result || '',
    preQualificationAnalysisResult: data.pre_qualification_analysis_result || '',
  }
}

export function callReportPercentagesFromApi(
  data: CallReportPercentagesFromApi
): CallReportPercentages {
  return {
    totalSpend: indicatorFromApi(data.total_spend),
    totalRevenue: indicatorFromApi(data.total_revenue),
    totalProfit: indicatorFromApi(data.total_profit),
    totalRoi: indicatorFromApi(data.total_roi),
    totalConversion: indicatorFromApi(data.total_conversion),
    totalLeadsToCall: indicatorFromApi(data.total_leads_to_call),
    totalLeads: indicatorFromApi(data.total_leads),
    totalCalls: indicatorFromApi(data.total_calls),
    totalAnswered: indicatorFromApi(data.total_answered),
    totalBillable: indicatorFromApi(data.total_billable),
    totalAnsweredToBillable: indicatorFromApi(data.total_answered_to_billable),
    totalCallsToAnswered: indicatorFromApi(data.total_calls_to_answered),
    totalCpl: indicatorFromApi(data.total_cpl),
    totalCpc: indicatorFromApi(data.total_cpc),
    totalCps: indicatorFromApi(data.total_cps),
    totalRpl: indicatorFromApi(data.total_rpl),
    totalRpc: indicatorFromApi(data.total_rpc),
    totalRps: indicatorFromApi(data.total_rps),
    totalSpendLeads: indicatorFromApi(data.total_spend_leads),
    totalSpendCalls: indicatorFromApi(data.total_spend_calls),
    totalUniqueCalls: indicatorFromApi(data.total_unique_calls),
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
    leads_sub1id5: multipleSelectToApi(filters.pubIdYp),
    select_states: multipleSelectToApi(filters.state),
    convertions_traffic1source1id: filters.trafficSource,
    date_start: filters.startDate?.toISOString().slice(0, 10),
    date_end: filters.endDate?.toISOString().slice(0, 10),
    convertions_status: filters.status,
    convertions_phone1id: '',
    phone: filters.phone,
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
): CallReportListFiltersFormValues => {
  const { startOfDay, endOfDay } = getDayLimits()

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
    offers: parseOptions(searchParams.get('offers')),
    pubId: parseOptions(searchParams.get('pubId')),
    pubIdYp: parseOptions(searchParams.get('pubIdYp')),
    state: parseOptions(searchParams.get('state')),
    trafficSource: searchParams.get('trafficSource') ?? '',
    buyers: parseOptions(searchParams.get('buyers')),
    issueType: parseOptions(searchParams.get('issueType')),
    callIssues: searchParams.get('callIssues') ?? '',
    startDate: searchParams.get('date_start')
      ? new Date(searchParams.get('date_start')!)
      : startOfDay,
    endDate: searchParams.get('date_end') ? new Date(searchParams.get('date_end')!) : endOfDay,
    status: searchParams.get('status') ?? '',
    insurance: searchParams.get('insurance') ?? '',
    phone: searchParams.get('phone') ?? '',
    terminatingPhone: searchParams.get('terminatingPhone') ?? '',
    didTd: searchParams.get('didTd') ?? '',
    account: searchParams.get('account') ?? '',
    name: searchParams.get('name') ?? '',
    email: searchParams.get('email') ?? '',
    type_out: searchParams.get('type_out') ?? '',
    vendor: searchParams.get('vendor') ?? '',
  }
}

export const transformFiltersToUrl = (
  filters: CallReportListFiltersFormValues
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.offers?.length) {
    params.set('offers', JSON.stringify(filters.offers))
  }
  if (filters.pubId?.length) {
    params.set('pubId', JSON.stringify(filters.pubId))
  }
  if (filters.pubIdYp?.length) {
    params.set('pubIdYp', JSON.stringify(filters.pubIdYp))
  }
  if (filters.state?.length) {
    params.set('state', JSON.stringify(filters.state))
  }
  if (filters.buyers?.length) {
    params.set('buyers', JSON.stringify(filters.buyers))
  }
  if (filters.issueType?.length) {
    params.set('issueType', JSON.stringify(filters.issueType))
  }
  if (filters.callIssues) {
    params.set('callIssues', filters.callIssues)
  }
  if (filters.trafficSource) {
    params.set('trafficSource', filters.trafficSource)
  }
  if (filters.startDate) {
    params.set('date_start', filters.startDate.toISOString())
  }
  if (filters.endDate) {
    params.set('date_end', filters.endDate.toISOString())
  }
  if (filters.status) {
    params.set('status', filters.status)
  }
  if (filters.insurance) {
    params.set('insurance', filters.insurance)
  }
  if (filters.phone) {
    params.set('phone', filters.phone)
  }
  if (filters.terminatingPhone) {
    params.set('terminatingPhone', filters.terminatingPhone)
  }
  if (filters.didTd) {
    params.set('didTd', filters.didTd)
  }

  return params
}
