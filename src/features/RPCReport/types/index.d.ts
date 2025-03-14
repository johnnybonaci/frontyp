export interface RPCReportItemFromApi {
  total_revenue: string
  total_cost: number | string
  total_calls: number | string
  total_billables: number | string
  total_sales: number | string
  total_durations: string
  total_rpc: number | string
  total_ucr: number | string
  total_unique: number
  total_ucr_1: string
  total_cpc: number | string
  buyer_name: string
  _children?: RPCReportItemFromApi[]
  state: string
}
export interface RPCReportItem {
  totalRevenue: string
  totalCost: number | string
  totalCalls: number | string
  totalBillables: number | string
  totalSales: number | string
  totalDurations: string
  totalRpc: number | string
  totalUcr: number | string
  variations: string
  totalUnique: number
  totalCpc: number | string
  buyerName: string
  children?: RPCReportItem[]
  state: string
}

interface RPCReportIndicators {
  totalRevenue: string
  totalCost: string
  totalCalls: string
  totalBillables: string
  totalSales: string
  totalDurations: string
  totalRpc: string
  totalUcr: string
  totalUnique: number
  totalCpc: string
  buyerName: string
  state: string
}

interface RPCReportIndicatorsFromApi {
  total_revenue: string
  total_cost: string
  total_calls: string
  total_billables: string
  total_sales: string
  total_durations: string
  total_rpc: string
  total_ucr: string
  total_unique: number
  total_cpc: string
  buyer_name: string
  state: string
}
