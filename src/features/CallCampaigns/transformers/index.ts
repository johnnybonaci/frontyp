import {
  type CallCampaignIndicators,
  type CallCampaignIndicatorsFromApi,
  type CallCampaignItem,
  type CallCampaignItemFromApi,
} from '../types/index'
import { type Filters } from 'types/filter'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import _ from 'lodash'
import { formatPercentageIndicator } from 'hooks/indicator.ts'
import { CallCampaignListFiltersFormValues } from '../components/CallCampaignFilters/CallCampaignFilters.tsx'
import getDayLimits from 'utils/getDayLimits.ts'
import { objectFromUrl } from 'utils/utils.ts'
import dateFromUrl from 'utils/dateFromUrl.ts'
import { dateNoTimezoneToString } from 'utils/dateWithoutTimezone.ts'

export const callCampaignItemFromApi = (item: CallCampaignItemFromApi): CallCampaignItem => {
  return {
    totalLeads: item.total_leads,
    totalCalls: item.total_calls,
    totalAnswered: item.total_answered,
    totalSales: item.total_sales,
    totalSpend: item.total_spend,
    totalSpendLeads: item.total_spend_leads,
    totalSpendCalls: item.total_spend_calls,
    costPerLead: item.cost_per_lead,
    revPerLead: item.rev_per_lead,
    costPerCalls: item.cost_per_calls,
    revPerCalls: item.rev_per_calls,
    costPerSales: item.cost_per_sales,
    grossRevenue: item.gross_revenue,
    grossProfit: item.gross_profit,
    grossMargin: formatPercentageIndicator(item.gross_margin),
    revenuePerSale: item.revenue_per_sale,
    revenuePerCall: item.revenue_per_call,
    callPer: formatPercentageIndicator(item.call_per),
    cpaPer: formatPercentageIndicator(item.cpa_per),
    type: item.type,
    pubId: item.pub_id,
    subId: item.sub_id,
    subId2: item.sub_id2,
    subId3: item.sub_id3,
    subId4: item.sub_id4,
    vendorsYp: item.vendors_yp,
    vendorsTd: item.vendors_td,
    campaignName: item.campaign_name,
  }
}

export function callCampaignIndicatorsFromApi(
  data: CallCampaignIndicatorsFromApi
): CallCampaignIndicators {
  return {
    totalSpend: data.total_spend,
    totalRevenue: data.total_revenue,
    totalProfit: data.total_profit,
    totalRoi: data.total_roi,
    totalConvertion: data.total_convertion,
    totalLeadstocall: data.total_leadstocall,
    totalLeads: data.total_leads,
    totalCalls: data.total_calls,
    totalAnswered: data.total_answered,
    totalBillable: data.total_billable,
    totalAnsweredtobillable: data.total_answeredtobillable,
    totalCallstoanswered: data.total_callstoanswered,
    totalCpl: data.total_cpl,
    totalCpc: data.total_cpc,
    totalCps: data.total_cps,
    totalRpl: data.total_rpl,
    totalRpc: data.total_rpc,
    totalRps: data.total_rps,
    totalSpendLeads: data.total_spend_leads,
    totalSpendCalls: data.total_spend_calls,
    totalUniquecalls: data.total_uniquecalls,
  }
}

export const transformFiltersToApi = (filters: Filters): Filters => {
  return {
    view_by: filters.viewBy,
    date_start: filters.startDate ? dateNoTimezoneToString(filters.startDate) : undefined,
    date_end: filters.endDate ? dateNoTimezoneToString(filters.endDate) : undefined,
    pubs_pub1list1id: multipleSelectToApi(filters.pubIdTD),
    leads_cc1id: multipleSelectToApi(filters.ccId),
    leads_type: multipleSelectToApi(filters.type),
    convertions_traffic1source1id: multipleSelectToApi(filters.trafficSourceTD),
    leads_sub1id5: multipleSelectToApi(filters.pubIdYp),
    url_switch: 'campaign-dashboard',
    date_record: 'date_created',
    leads_sub1id3: filters.campaignYP,
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): CallCampaignListFiltersFormValues => {
  const { startOfDay } = getDayLimits()
  const verga = searchParams.get('date_start') ? dateFromUrl(searchParams.get('date_start')!) : startOfDay
  console.log('verga ' + verga)
  console.log('startOfDay ' + startOfDay)
  return {
    viewBy: searchParams.get('viewBy')
      ? JSON.parse(decodeURIComponent(searchParams.get('viewBy')!))
      : 'leads.sub_id3',
    pubIdTD: objectFromUrl(searchParams.get('pubId')),
    ccId: objectFromUrl(searchParams.get('pubId')),
    startDate: searchParams.get('date_start')
      ? dateFromUrl(searchParams.get('date_start')!)
      : startOfDay,
    endDate: searchParams.get('date_end') ? dateFromUrl(searchParams.get('date_end')!) : startOfDay,
    type: objectFromUrl(searchParams.get('pubId')),
    trafficSourceTD: objectFromUrl(searchParams.get('pubId')),
    pubIdYp: objectFromUrl(searchParams.get('pubId')),
    campaignYP: searchParams.get('viewBy')
      ? JSON.parse(decodeURIComponent(searchParams.get('viewBy')!))
      : '',
  }
}

export const transformFiltersToUrl = (
  filters: CallCampaignListFiltersFormValues
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.viewBy) {
    params.set('viewBy', JSON.stringify(filters.viewBy))
  }
  if (filters.pubIdTD?.length) {
    params.set('pubIdTD', JSON.stringify(filters.pubIdTD))
  }

  if (filters.ccId?.length) {
    params.set('ccId', JSON.stringify(filters.ccId))
  }

  if (filters.startDate) {
    params.set('date_start', dateNoTimezoneToString(filters.startDate))
    console.log('startDate ' + filters.startDate)
    console.log('dateNoTimezoneToString ' + dateNoTimezoneToString(filters.startDate))

  }
  if (filters.endDate) {
    params.set('date_end', dateNoTimezoneToString(filters.endDate))
  }

  if (filters.type?.length) {
    params.set('ccId', JSON.stringify(filters.ccId))
  }

  if (filters.trafficSourceTD?.length) {
    params.set('trafficSourceTD', JSON.stringify(filters.trafficSourceTD))
  }

  if (filters.pubIdYp?.length) {
    params.set('pubIdYp', JSON.stringify(filters.pubIdYp))
  }

  if (filters.campaignYP?.length) {
    params.set('campaignYP', JSON.stringify(filters.campaignYP))
  }

  return params
}
