import {
  type CPCReportIndicators,
  type CPCReportIndicatorsFromApi,
  type CPCReportItem,
  type CPCReportItemFromApi,
} from '../types'
import { type Filters } from 'types/filter'
import { type CPCReportListFiltersFormValues } from 'features/CPCReport/components/CPCReportFilters/CPCReportFilters.tsx'
import getDayLimits from 'utils/getDayLimits.ts'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import { dateNoTimezoneToString } from 'utils/dateWithoutTimezone.ts'

export const cpcReportItemFromApi = (item: CPCReportItemFromApi): CPCReportItem => {
  return {
    campaignName: item.campaign_name,
    createdAt: item.created_at,
    dateHistory: item.date_history,
    id: item.id,
    ip: item.ip,
    url: item.url,
  }
}

export function cpcReportIndicatorsFromApi(data: CPCReportIndicatorsFromApi): CPCReportIndicators {
  return {
    linkout: data.linkout,
    coreg: data.coreg,
    other: data.other,
  }
}

export const transformFiltersToApi = (filters: Filters): Filters => {
  const filter = []

  if (filters.campaign) {
    filter.push({
      field: 'campaign_name',
      type: 'like',
      value: filters.campaign,
    })
  }

  if (filters.ip) {
    filter.push({
      field: 'ip',
      type: 'like',
      value: filters.ip,
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
): CPCReportListFiltersFormValues => {
  const { startOfDay, endOfDay } = getDayLimits()

  return {
    ip: searchParams.get('ip') ?? '',
    campaign: searchParams.get('campaign') ?? '',
    startDate: searchParams.get('date_start')
      ? new Date(searchParams.get('date_start')!)
      : startOfDay,
    endDate: searchParams.get('date_end') ? new Date(searchParams.get('date_end')!) : endOfDay,
  }
}

export const transformFiltersToUrl = (filters: CPCReportListFiltersFormValues): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.ip) {
    params.set('ip', filters.ip)
  }

  if (filters.campaign) {
    params.set('campaign', filters.campaign)
  }

  if (filters.startDate) {
    params.set('date_start', filters.startDate.toISOString())
  }
  if (filters.endDate) {
    params.set('date_end', filters.endDate.toISOString())
  }

  return params
}
