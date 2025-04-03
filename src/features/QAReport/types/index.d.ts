export interface QAReportItemFromApi {
  vendors_td: string
  buyer_id: number
  buyers: string
  phone_id: number
  durations: string
  o_durations: number
  created_at: string | null
  offers: string
  pub_list_id: number
  date_sale: string
  traffic_source_id: number
  ad_quality_error: boolean
  not_interested: boolean
  not_qualified: boolean
  call_dropped: boolean
  ivr: boolean
  hold_durations: string
  o_hold_durations: number
  status_td: string
  reached_agent: boolean
  caller_hung_up: number
  state: string
}

export interface QAReportItem {
  vendorsTd: string
  buyerId: number
  buyers: string
  phoneId: number
  durations: string
  oDurations: number
  createdAt: string | null
  offers: string
  pubListId: number
  dateSale: string
  trafficSourceId: number
  adQualityError: boolean
  notInterested: boolean
  notQualified: boolean
  callDropped: boolean
  ivr: boolean
  holdDurations: string
  oHoldDurations: number
  statusTd: string
  reachedAgent: boolean
  callerHungUp: number
  state: string
}

interface QAReportIndicators {
  totalCalls: number
  totalReachedAgent: number
  totalReachedAgentQ: number
  totalIvr: number
  totalIvrQ: number
  totalAvgHoldDurations: string
  totalTenHoldDurationsQ: number
  totalTenHoldDurations: number
  totalAvgDurations: string
  totalAdQualityError: number
  totalCallDropped: number
  totalCallDroppedQ: number
  totalNotInterested: number
  totalNotInterestedQ: number
  totalNotQualified: number
  totalNotQualifiedQ: number
  totalCallerHungUp: number
  totalCallerHungUpQ: number
}

interface QAReportIndicatorsFromApi {
  total_calls: number
  total_reached_agent: number
  total_reached_agent_q: number
  total_ivr: number
  total_ivr_q: number
  total_avg_hold_durations: string
  total_ten_hold_durations_q: number
  total_ten_hold_durations: number
  total_avg_durations: string
  total_ad_quality_error: number
  total_call_dropped: number
  total_call_dropped_q: number
  total_not_interested: number
  total_not_interested_q: number
  total_not_qualified: number
  total_not_qualified_q: number
  total_caller_hung_up: number
  total_caller_hung_up_q: number
}
