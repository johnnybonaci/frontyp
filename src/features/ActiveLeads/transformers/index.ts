import {
  type ActiveLeadsAverageFromApi,
  type ActiveLeadsAverages,
  type ActiveLeadsItem,
  type ActiveLeadsItemFromApi,
  type ActiveLeadsPercentages,
  type ActiveLeadsPercentagesFromApi,
} from '../types'
import { indicatorFromApi } from 'hooks/indicator.ts'
import { type Filters } from 'types/filter'
import { type ActiveLeadsListFiltersFormValues } from 'features/ActiveLeads/components/ActiveLeadsFilters/ActiveLeadsFilters.tsx'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import { objectFromUrl } from 'utils/utils.ts'
import getDayLimits from 'utils/getDayLimits.ts'
import { ALL_LEADS_OPTION } from 'hooks/useFetchData.tsx'
import { dateNoTimezoneToString } from 'utils/dateWithoutTimezone.ts'
import dateFromUrl from 'utils/dateFromUrl.ts'

export const activeLeadsItemFromApi = (item: ActiveLeadsItemFromApi): ActiveLeadsItem => {
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
    pubIdYp: item.sub_id5,
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

export function activeLeadsAveragesFromApi(data: ActiveLeadsAverageFromApi): ActiveLeadsAverages {
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

export function activeLeadsPercentagesFromApi(
  data: ActiveLeadsPercentagesFromApi
): ActiveLeadsPercentages {
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
  const filter = []

  if (filters.phone) {
    filter.push({
      field: 'phone',
      type: 'like',
      value: filters.phone,
    })
  }

  if (filters.firstName) {
    filter.push({
      field: 'first_name',
      type: 'like',
      value: filters.firstName,
    })
  }

  if (filters.lastName) {
    filter.push({
      field: 'last_name',
      type: 'like',
      value: filters.lastName,
    })
  }

  if (filters.email) {
    filter.push({
      field: 'email',
      type: 'like',
      value: filters.email,
    })
  }

  return {
    date_start: filters.startDate ? dateNoTimezoneToString(filters.startDate) : undefined,
    date_end: filters.endDate ? dateNoTimezoneToString(filters.endDate) : undefined,
    leads_sub1id5: multipleSelectToApi(filters.pubIdYp),
    leads_type: filters.leadsType?.map((item: any) => item.id).join(','),
    pubs_pub1list1id: multipleSelectToApi(filters.pubId),
    subs_id: filters.subId?.id,
    campaign1name1id: filters.campaign?.id,
    convertions_traffic1source1id: multipleSelectToApi(filters.trafficSource),
    convertions_status: filters.status === ALL_LEADS_OPTION ? '' : filters.status,
    status: filters.status === ALL_LEADS_OPTION ? '' : filters.status,
    url_switch: 'leads',
    date_record: 'date_sale',
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): ActiveLeadsListFiltersFormValues => {
  const { startOfDay } = getDayLimits()

  return {
    leadsType: objectFromUrl(searchParams.get('leadsType')),
    pubId: objectFromUrl(searchParams.get('pubId')),
    campaign: objectFromUrl(searchParams.get('campaign'), null),
    trafficSource: objectFromUrl(searchParams.get('trafficSource')),
    startDate: searchParams.get('date_start')
      ? dateFromUrl(searchParams.get('date_start')!)
      : startOfDay,
    endDate: searchParams.get('date_end') ? dateFromUrl(searchParams.get('date_end')!) : startOfDay,
    pubIdYp: objectFromUrl(searchParams.get('pubIdYp')),
    status: searchParams.get('status') ?? '',
    firstName: searchParams.get('firstName') ?? '',
    phone: searchParams.get('phone') ?? '',
    lastName: searchParams.get('lastName') ?? '',
    email: searchParams.get('email') ?? '',
    name: searchParams.get('name') ?? '',
  }
}

export const transformFiltersToUrl = (
  filters: ActiveLeadsListFiltersFormValues
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.pubId?.length) {
    params.set('pubId', JSON.stringify(filters.pubId))
  }
  if (filters.pubIdYp?.length) {
    params.set('pubIdYp', JSON.stringify(filters.pubIdYp))
  }

  if (filters.leadsType?.length) {
    params.set('leadsType', JSON.stringify(filters.leadsType))
  }

  if (filters.trafficSource?.length) {
    params.set('trafficSource', JSON.stringify(filters.trafficSource))
  }
  if (filters.startDate) {
    params.set('date_start', dateNoTimezoneToString(filters.startDate))
  }
  if (filters.endDate) {
    params.set('date_end', dateNoTimezoneToString(filters.endDate))
  }
  if (filters.status) {
    params.set('status', filters.status)
  }
  if (filters.campaign) {
    params.set('campaign', JSON.stringify(filters.campaign))
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

  return params
}
