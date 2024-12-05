export interface CPCReportItemFromApi {
  campaign_name: string
  created_at: string
  date_history: string
  id: number | string
  ip: string
  url: string
}

export interface CPCReportItem {
  campaignName: string
  createdAt: string
  dateHistory: string
  id: number | string
  ip: string
  url: string
}

interface CPCReportIndicators {
  coreg: string
  linkout: string
  other: string
}

interface CPCReportIndicatorsFromApi {
  coreg: string
  linkout: string
  other: string
}
