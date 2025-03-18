export interface RPCReportItemFromApi {
  total_revenue: string,
  total_profit: number | string,
  total_revs: number | string,
  total_calls: number | string,
  total_unique: number,
  total_durations: string,
  buyer_name: string,
  state: string,
  total_billables: number | string,
  total_rpc: number | string,
  _children?: RPCReportItemFromApi[]
}
export interface RPCReportItem {
  totalRevenue: string,
  totalProfit: number | string,
  totalRevs: number | string,
  totalCalls: number | string,
  totalUnique: number,
  totalDurations: string,
  buyerName: string,
  state: string,
  totalBillables: number | string,
  totalRpc: number | string,
  children?: RPCReportItem[]
}

interface RPCReportIndicators {
  totalRevenue: string,
  totalProfit: string,
  totalRevs: string,
  totalCalls: string,
  totalUnique: number,
  totalDurations: string,
  buyerName: string,
  state: string,
  totaBillables: string,
  totalRpc: string,
}

interface RPCReportIndicatorsFromApi {
  total_revenue: string,
  total_profit: string,
  total_revs: string,
  total_calls: string,
  total_unique: number,
  total_durations: string,
  buyer_name: string,
  state: string,
  total_billables: string,
  total_rpc: string
}
