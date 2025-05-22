export interface ReportLeadsItemFromApi {
  date_history: string
  type: string
  pub_id: number
  leads: number
  leads_dup: number
  total_leads: number
  unique_leads: number
}

export interface ReportLeadsItem {
  dateHistory: string
  type: string
  pubId: number
  leads: number
  leadsDup: number
  totalLeads: number
  uniqueLeads: number
}