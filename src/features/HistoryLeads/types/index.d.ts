export interface HistoryLeadsItemFromApi {
  created_at: string
  date_history: string
  email: string
  first_name: string
  last_name: string
  phone: number
  pub_list_id: number
  sub_id: string
  trusted_form: string | null
  type: string
  universal_lead_id: string
  vendors_yp: string
}

export interface HistoryLeadsItem {
  createdAt: string
  dateHistory: string
  email: string
  firstName: string
  lastName: string
  phone: number
  pubListId: number
  subId: string
  trustedForm: string | null
  type: string
  universalLeadId: string
  vendorsYp: string
}
