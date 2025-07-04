export interface ActiveLeadsItemFromApi {
  yieldpro_lead_id: string
  type: string
  first_name: string
  last_name: string
  email: string | null
  zip_code: string | null
  universal_lead_id: string
  trusted_form: string | null
  sub_id: string
  pub_list_id: number
  state: string
  sub_id5: string
  data: any[]
  cpl: string
  campaign_name_id: string
  vendors_yp: string
  phone: number
  calls: number
  status: string
  created_at: string
}

export interface ActiveLeadsItem {
  id: string
  yieldproLeadId: string
  type: string
  firstName: string
  lastName: string
  email: string | null
  pubIdYp: string
  zipCode: string | null
  universalLeadId: string
  trustedForm: string | null
  subId: string
  pubListId: number
  state: string
  data: any[]
  cpl: string
  campaignNameId: string
  vendorsYp: string
  phone: number
  calls: number
  status: string
  createdAt: string
}

export interface ActiveLeadsAverageFromApi {
  total_spend: number
  total_revenue: number
  total_profit: number
  total_roi: number
  total_convertion: number
  total_leadstocall: number
  total_leads: number
  total_calls: string
  total_answered: string
  total_billable: string
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

export interface ActiveLeadsAverages {
  totalSpend: number
  totalRevenue: number
  totalProfit: number
  totalRoi: number
  totalConversion: number
  totalLeadsToCall: number
  totalLeads: number
  totalCalls: number
  totalAnswered: number
  totalBillable: number
  totalAnsweredToBillable: number
  totalCallsToAnswered: number
  totalCpl: number
  totalCpc: number
  totalCps: number
  totalRpl: number
  totalRpc: number
  totalRps: number
  totalSpendLeads: number
  totalSpendCalls: number
  totalUniqueCalls: number
}

interface ActiveLeadsPercentages {
  totalSpend: number
  totalRevenue: number
  totalProfit: number
  totalRoi: number
  totalConversion: number
  totalLeadsToCall: number
  totalLeads: number
  totalCalls: number
  totalAnswered: number
  totalBillable: number
  totalAnsweredToBillable: number
  totalCallsToAnswered: number
  totalCpl: number
  totalCpc: number
  totalCps: number
  totalRpl: number
  totalRpc: number
  totalRps: number
  totalSpendLeads: number
  totalSpendCalls: number
  totalUniqueCalls: number
}

interface ActiveLeadsPercentagesFromApi {
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
