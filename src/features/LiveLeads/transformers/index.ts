import {
  type LiveLeadsAverageFromApi,
  type LiveLeadsAverages,
  type LiveLeadsItem,
  type LiveLeadsItemFromApi,
  type LiveLeadsPercentages,
  type LiveLeadsPercentagesFromApi,
} from '../types'
import { indicatorFromApi } from 'hooks/indicator.ts'
import { type Filters } from 'types/filter'
import { type LiveLeadsListFiltersFormValues } from 'features/LiveLeads/components/LiveLeadsFilters/LiveLeadsFilters.tsx'
import { type Option } from 'components/MultiSelect/MultiSelect.tsx'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'

export const liveLeadsItemFromApi = (item: LiveLeadsItemFromApi): LiveLeadsItem => {
  return {
    id: item.yieldpro_lead_id,
    yieldproLeadId: item.yieldpro_lead_id,
    type: item.type,
    firstName: item.first_name,
    lastName: item.last_name,
    email: item.email,
    zipCode: item.zip_code,
    universalLeadId: item.universal_lead_id,
    trustedForm: item.trusted_form,
    subId: item.sub_id,
    pubListId: item.pub_list_id,
    state: item.state,
    data: item.data,
    cpl: item.cpl,
    campaignNameId: item.campaign_name_id,
    vendorsYp: item.vendors_yp,
    phone: item.phone,
    calls: item.calls,
    status: item.status,
    createdAt: item.created_at,
  }
}

export function liveLeadsAveragesFromApi(data: LiveLeadsAverageFromApi): LiveLeadsAverages {
  return {
    totalSpend: indicatorFromApi(data.total_spend),
    totalRevenue: indicatorFromApi(data.total_revenue),
    totalProfit: indicatorFromApi(data.total_profit),
    totalRoi: indicatorFromApi(data.total_roi),
    totalConversion: indicatorFromApi(data.total_convertion),
    totalLeadsToCall: indicatorFromApi(data.total_leadstocall),
    totalLeads: indicatorFromApi(data.total_leads),
    totalCalls: indicatorFromApi(data.total_calls),
    totalAnswered: indicatorFromApi(data.total_answered),
    totalBillable: indicatorFromApi(data.total_billable),
    totalAnsweredToBillable: indicatorFromApi(data.total_answeredtobillable),
    totalCallsToAnswered: indicatorFromApi(data.total_callstoanswered),
    totalCpl: indicatorFromApi(data.total_cpl),
    totalCpc: indicatorFromApi(data.total_cpc),
    totalCps: indicatorFromApi(data.total_cps),
    totalRpl: indicatorFromApi(data.total_rpl),
    totalRpc: indicatorFromApi(data.total_rpc),
    totalRps: indicatorFromApi(data.total_rps),
    totalSpendLeads: indicatorFromApi(data.total_spend_leads),
    totalSpendCalls: indicatorFromApi(data.total_spend_calls),
    totalUniqueCalls: indicatorFromApi(data.total_uniquecalls),
  }
}

export function liveLeadsPercentagesFromApi(
  data: LiveLeadsPercentagesFromApi
): LiveLeadsPercentages {
  return {
    totalSpend: indicatorFromApi(data.total_spend),
    totalRevenue: indicatorFromApi(data.total_revenue),
    totalProfit: indicatorFromApi(data.total_profit),
    totalRoi: indicatorFromApi(data.total_roi),
    totalConversion: indicatorFromApi(data.total_convertion),
    totalLeadsToCall: indicatorFromApi(data.total_leadstocall),
    totalLeads: indicatorFromApi(data.total_leads),
    totalCalls: indicatorFromApi(data.total_calls),
    totalAnswered: indicatorFromApi(data.total_answered),
    totalBillable: indicatorFromApi(data.total_billable),
    totalAnsweredToBillable: indicatorFromApi(data.total_answeredtobillable),
    totalCallsToAnswered: indicatorFromApi(data.total_callstoanswered),
    totalCpl: indicatorFromApi(data.total_cpl),
    totalCpc: indicatorFromApi(data.total_cpc),
    totalCps: indicatorFromApi(data.total_cps),
    totalRpl: indicatorFromApi(data.total_rpl),
    totalRpc: indicatorFromApi(data.total_rpc),
    totalRps: indicatorFromApi(data.total_rps),
    totalSpendLeads: indicatorFromApi(data.total_spend_leads),
    totalSpendCalls: indicatorFromApi(data.total_spend_calls),
    totalUniqueCalls: indicatorFromApi(data.total_uniquecalls),
  }
}
export const transformFiltersToApi = (filters: Filters): Filters => {
  // REVISAR

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
    leads_type: multipleSelectToApi(filters.leadsType),
    pubs_pub1list1id: multipleSelectToApi(filters.pubId),
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
): LiveLeadsListFiltersFormValues => {
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
    subId: parseOptions(searchParams.get('subId')),
    leadsType: parseOptions(searchParams.get('leadsType')),
    pubId: parseOptions(searchParams.get('pubId')),
    campaign: searchParams.get('campaign') ?? '',
    trafficSource: searchParams.get('trafficSource') ?? '',
    startDate: searchParams.get('date_start')
      ? new Date(searchParams.get('date_start')!)
      : new Date(),
    endDate: searchParams.get('date_end') ? new Date(searchParams.get('date_end')!) : new Date(),
    status: searchParams.get('status') ?? '',
    firstName: searchParams.get('firstName') ?? '',
    phone: searchParams.get('phone') ?? '',
    lastName: searchParams.get('lastName') ?? '',
    email: searchParams.get('email') ?? '',
    name: searchParams.get('name') ?? '',
  }
}

export const transformFiltersToUrl = (filters: LiveLeadsListFiltersFormValues): string => {
  const params = new URLSearchParams()

  if (filters.pubId?.length) {
    params.set('pubId', JSON.stringify(filters.pubId))
  }
  if (filters.subId?.length) {
    params.set('subId', JSON.stringify(filters.subId))
  }

  if (filters.leadsType?.length) {
    params.set('leadsType', JSON.stringify(filters.leadsType))
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
  if (filters.campaign) {
    params.set('campaign', filters.campaign)
  }
  if (filters.firstName) {
    params.set('firstName', filters.firstName)
  }
  if (filters.lastName) {
    params.set('lastName', filters.lastName)
  }
  if (filters.email) {
    params.set('email', filters.email)
  }
  if (filters.phone) {
    params.set('phone', filters.phone)
  }

  return params.toString()
}
