import {
  type ComplianceBotIndicators,
  type ComplianceBotIndicatorsFromApi,
  type ComplianceBotItem,
  type ComplianceBotItemFromApi,
} from '../types'
import { type Filters } from 'types/filter'
import { type ComplianceBotListFiltersFormValues } from 'features/ComplianceBot/components/ComplianceBotFilters/ComplianceBotFilters.tsx'
import getDayLimits from 'utils/getDayLimits.ts'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import { dateNoTimezoneToString } from 'utils/dateWithoutTimezone.ts'

export const complianceBotItemFromApi = (item: ComplianceBotItemFromApi): ComplianceBotItem => {
  return {
    createdAt: item.created_at,
    dateHistory: item.date_history,
    email: item.email,
    firstName: item.first_name,
    lastName: item.last_name,
    ip: item.ip,
    region: item.region,
    city: item.city,
    phoneBot: item.phone_bot,
    state: item.state,
    tries: item.tries,
    trustedForm: item.trusted_form,
    type: item.type,
    universalLeadId: item.universal_lead_id,
    updatedAt: item.updated_at,
    zipCode: item.zip_code,
  }
}
export function complianceBotIndicatorsFromApi(
  data: ComplianceBotIndicatorsFromApi
): ComplianceBotIndicators {
  return {
    total: data.total_leads,
    totalProcessed: data.total_proccessed,
    totalClean: data.total_clean,
    totalCleanPercent: data.total_clean_?.replace('%', ''),
    totalFraud: data.total_fraud,
    totalFraudPercent: data.total_fraud_?.replace('%', ''),
  }
}

export const transformFiltersToApi = (filters: Filters): Filters => {
  const filter = []

  if (filters.phone) {
    filter.push({
      field: 'phone_bot',
      type: 'like',
      value: filters.phone,
    })
  }

  return {
    date_start: filters.startDate ? dateNoTimezoneToString(filters.startDate) : undefined,
    date_end: filters.endDate ? dateNoTimezoneToString(filters.endDate) : undefined,
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): ComplianceBotListFiltersFormValues => {
  const { startOfDay, endOfDay } = getDayLimits()

  return {
    phone: searchParams.get('phone') ?? '',
    startDate: searchParams.get('date_start')
      ? new Date(searchParams.get('date_start')!)
      : startOfDay,
    endDate: searchParams.get('date_end') ? new Date(searchParams.get('date_end')!) : endOfDay,
  }
}

export const transformFiltersToUrl = (
  filters: ComplianceBotListFiltersFormValues
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.phone) {
    params.set('phone', filters.phone)
  }

  if (filters.startDate) {
    params.set('date_start', filters.startDate.toISOString())
  }
  if (filters.endDate) {
    params.set('date_end', filters.endDate.toISOString())
  }

  return params
}
