export interface ComplianceBotItemFromApi {
  created_at: string
  date_history: string
  email: string
  first_name: string
  ip: string
  region?: string
  city?: string
  last_name: string
  phone_bot: number | string
  state: string
  tries: number | null
  trusted_form: string | null
  type: string
  universal_lead_id: string
  updated_at: string
  zip_code: string
}

export interface ComplianceBotItem {
  createdAt: string
  dateHistory: string
  email: string
  firstName: string
  lastName: string
  ip: string
  region?: string
  city?: string
  phoneBot: number | string
  state: string
  tries: number | null
  trustedForm: string | null
  type: string
  universalLeadId: string
  updatedAt: string
  zipCode: string
}
interface ComplianceBotIndicators {
  total: string
  totalProcessed: string
  totalClean: string
  totalCleanPercent: string
  totalFraud: string
  totalFraudPercent: string
}

interface ComplianceBotIndicatorsFromApi {
  total_leads: string
  total_proccessed: string
  total_clean: string
  total_clean_: string
  total_fraud: string
  total_fraud_: string
}
