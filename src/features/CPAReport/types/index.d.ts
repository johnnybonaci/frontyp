export interface CPAReportItemFromApi {
  total_revenue: string
  total_cost: number | string
  total_calls: number | string
  total_billables: number | string
  total_sales: number | string
  total_durations: string
  total_cpa: number | string
  total_ucr: number | string
  total_unique: number
  total_ucr_1: string
  total_cpc: number | string
  buyer_name: string
  _children?: CPAReportItemFromApi[]
  state: string
}
export interface CPAReportItem {
  totalRevenue: string
  totalCost: number | string
  totalCalls: number | string
  totalBillables: number | string
  totalSales: number | string
  totalDurations: string
  totalCpa: number | string
  totalUcr: number | string
  variations: string
  totalUnique: number
  totalCpc: number | string
  buyerName: string
  children?: CPAReportItem[]
  state: string
}

interface CPAReportIndicators {
  totalRevenue: string
  totalCost: string
  totalCalls: string
  totalBillables: string
  totalSales: string
  totalDurations: string
  totalCpa: string
  totalUcr: string
  totalUnique: number
  totalCpc: string
  buyerName: string
  state: string
}

interface CPAReportIndicatorsFromApi {
  total_revenue: string
  total_cost: string
  total_calls: string
  total_billables: string
  total_sales: string
  total_durations: string
  total_cpa: string
  total_ucr: string
  total_unique: number
  total_cpc: string
  buyer_name: string
  state: string
}
