export interface CallCampaignItemFromApi {
  total_leads: number
  total_calls: string
  total_answered: string
  total_sales: string
  total_spend: number
  total_spend_leads: number
  total_spend_calls: number
  cost_per_lead: number
  rev_per_lead: number
  cost_per_calls: number
  rev_per_calls: number
  cost_per_sales: number
  gross_revenue: number
  gross_profit: number
  gross_margin: number
  revenue_per_sale: number
  revenue_per_call: number
  call_per: number
  cpa_per: number
  type: string
  pub_id: string
  sub_id: string
  sub_id2: string
  sub_id3: string
  sub_id4: string
  vendors_yp: string
  vendors_td: string
  campaign_name: string
}

export interface CallCampaignItem {
  totalLeads: number
  totalCalls: string
  totalAnswered: string
  totalSales: string
  totalSpend: number
  totalSpendLeads: number
  totalSpendCalls: number
  costPerLead: number
  revPerLead: number
  costPerCalls: number
  revPerCalls: number
  costPerSales: number
  grossRevenue: number
  grossProfit: number
  grossMargin: string
  revenuePerSale: number
  revenuePerCall: number
  callPer: string
  cpaPer: string
  type: string
  pubId: string
  subId: string
  subId2: string
  subId3: string
  subId4: string
  vendorsYp: string
  vendorsTd: string
  campaignName: string
}

export interface CallCampaignIndicators {
  totalSpend: number
  totalRevenue: number
  totalProfit: number
  totalRoi: number
  totalConvertion: number
  totalLeadstocall: number
  totalLeads: number
  totalCalls: number
  totalAnswered: number
  totalBillable: number
  totalAnsweredtobillable: number
  totalCallstoanswered: number
  totalCpl: number
  totalCpc: number
  totalCps: number
  totalRpl: number
  totalRpc: number
  totalRps: number
  totalSpendLeads: number
  totalSpendCalls: number
  totalUniquecalls
}

export interface CallCampaignIndicatorsFromApi {
  total_spend: number
  total_revenue: number
  total_profit: number
  total_roi: number
  total_convertion: number
  total_leadstocall: number
  total_leads: number
  total_calls: number
  total_answered: number
  total_billable: number
  total_answeredtobillable: number
  total_callstoanswered: number
  total_cpl: number
  total_cpc: number
  total_cps: number
  total_rpl: number
  total_rpc: number
  total_rps: number
  total_spend_leads: number
  total_spend_calls: number
  total_uniquecalls: number
}
