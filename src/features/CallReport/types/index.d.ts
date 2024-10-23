export interface CallReportItemFromApi {
  id: number
  url: string | null
  transcript: string | null
  billable: number | null
  status_t: number | null
  multiple?: CallReportMultipleFromApi
  did_number_id: number
  cpl: string
  vendors_td: string
  status: string
  buyer_id: number
  buyers: string
  revenue: string
  phone_id: number
  terminating_phone: string
  durations: string
  created_at: string | null
  offers: string
  offer_id: number
  pub_list_id: number
  date_sale: string
  calls: number
  converted: number
  traffic_source_id: number
  insurance: string
  insurance_value: number | null
  insurance_name: string
  state: string
}

export interface CallReportItem {
  id: number
  url: string | null
  transcript: string | null
  billable: number | null
  statusT: number | null
  multiple?: CallReportMultiple
  didNumberId: number
  cpl: string
  vendorsTd: string
  status: string
  buyerId: number
  buyers: string
  revenue: string
  phoneId: number
  terminatingPhone: string
  durations: string
  createdAt: string | null
  offers: string
  offerId: number
  pubListId: number
  dateSale: string
  calls: number
  converted: number
  trafficSourceId: number
  insurance: string
  insuranceValue: number | null
  insuranceName: string
  state: string
}

interface CallReportAverages {
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

interface CallReportPercentages {
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

interface CallReportAverageFromApi {
  total_spend: string
  total_revenue: string
  total_profit: string
  total_roi: string
  total_conversion: string
  total_leads_to_call: string
  total_leads: string
  total_calls: string
  total_answered: string
  total_billable: string
  total_answered_to_billable: string
  total_calls_to_answered: string
  total_cpl: string
  total_cpc: string
  total_cps: string
  total_rpl: string
  total_rpc: string
  total_rps: string
  total_spend_leads: string
  total_spend_calls: string
  total_unique_calls: string
}

interface CallReportPercentagesFromApi {
  total_spend: string
  total_revenue: string
  total_profit: string
  total_roi: string
  total_conversion: string
  total_leads_to_call: string
  total_leads: string
  total_calls: string
  total_answered: string
  total_billable: string
  total_answered_to_billable: string
  total_calls_to_answered: string
  total_cpl: string
  total_cpc: string
  total_cps: string
  total_rpl: string
  total_rpc: string
  total_rps: string
  total_spend_leads: string
  total_spend_calls: string
  total_unique_calls: string
}

export interface CallReportMultiple {
  data: string
  callIssues: string
  mistreatment: string
  personalData: string
  saleAnalysis: string
  callIssuesResult: string
  existingInsurance: string
  sentimentAnalysis: string
  mistreatmentResult: string
  callEndingAnalysis: string
  saleAnalysisResult: string
  saleAnalysisDetails: string
  existingInsuranceName: string | null
  callEndingSoonerResult: boolean
  existingInsuranceResult: string
  callEndingSoonerReasons: CallEndingSoonerReason[]
  conversationEffectiveness: string
  leadTypeAndParticipants: string
  preQualificationAnalysis: string
  conversationEffectivenessResult: string
  preQualificationAnalysisResult: string
}

export interface CallEndingSoonerReason {
  reason: string
  category: string
}

export interface CallReportMultipleFromApi {
  data: string
  call_issues: string
  mistreatment: string
  personal_data: string
  sale_analysis: string
  call_issues_result: string
  existing_insurance: string
  sentiment_analysis: string
  mistreatment_result: string
  call_ending_analysis: string
  sale_analysis_result: string
  sale_analysis_details: string
  existing_insurance_name: string | null
  call_ending_sooner_result: boolean
  existing_insurance_result: string
  call_ending_sooner_reasons: CallEndingSoonerReasonFromApi[]
  conversation_effectiveness: string
  lead_type_and_participants: string
  pre_qualification_analysis: string
  conversation_effectiveness_result: string
  pre_qualification_analysis_result: string
}

export interface CallEndingSoonerReasonFromApi {
  reason: string
  category: string
}
