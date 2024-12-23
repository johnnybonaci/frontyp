import { type Filters } from 'types/filter'
import { type ComplianceListFiltersFormValues } from 'features/Compliance/components/ComplianceFilters/ComplianceFilters.tsx'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import { objectFromUrl } from 'utils/utils.ts'
import getDayLimits from 'utils/getDayLimits.ts'
import { type ComplianceItem, type ComplianceItemFromApi } from 'features/Compliance/types'
import { dateNoTimezoneToString } from 'utils/dateWithoutTimezone.ts'
import dateFromUrl from 'utils/dateFromUrl.ts'

export const complianceItemFromApi = (item: ComplianceItemFromApi): ComplianceItem => {
  return {
    createdAt: item.created_at,
    dateHistory: item.date_history,
    email: item.email,
    firstName: item.first_name,
    lastName: item.last_name,
    phone: item.phone,
    pubListId: item.pub_list_id,
    subId: item.sub_id,
    trustedForm: item.trusted_form,
    type: item.type,
    universalLeadId: item.universal_lead_id,
    vendorsYp: item.vendors_yp,
  }
}

export const transformFiltersToApi = (filters: Filters): Filters => {
  const filter = []

  if (filters.phone) {
    filter.push({
      field: 'phone',
      type: 'like',
      value: filters.phone,
    })
  }

  if (filters.email) {
    filter.push({
      field: 'email',
      type: 'like',
      value: filters.email,
    })
  }

  return {
    date_start: filters.startDate?.toISOString().slice(0, 10),
    date_end: filters.endDate?.toISOString().slice(0, 10),
    leads_type: filters.leadsType?.id,
    pubs_pub1list1id: filters.pubId?.id,
    subs_id: filters.subId?.id,
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): ComplianceListFiltersFormValues => {
  const { startOfDay } = getDayLimits()

  return {
    leadsType: objectFromUrl(searchParams.get('leadsType'), null),
    pubId: objectFromUrl(searchParams.get('pubId'), null),
    subId: objectFromUrl(searchParams.get('subId'), null),
    startDate: searchParams.get('date_start')
      ? dateFromUrl(searchParams.get('date_start')!)
      : startOfDay,
    endDate: searchParams.get('date_end') ? dateFromUrl(searchParams.get('date_end')!) : startOfDay,
    phone: searchParams.get('phone') ?? '',
    email: searchParams.get('email') ?? '',
  }
}

export const transformFiltersToUrl = (
  filters: ComplianceListFiltersFormValues
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.pubId) {
    params.set('pubId', JSON.stringify(filters.pubId))
  }
  if (filters.subId) {
    params.set('subId', JSON.stringify(filters.subId))
  }
  if (filters.leadsType) {
    params.set('leadsType', JSON.stringify(filters.leadsType))
  }
  if (filters.startDate) {
    params.set('date_start', dateNoTimezoneToString(filters.startDate))
  }
  if (filters.endDate) {
    params.set('date_end', dateNoTimezoneToString(filters.endDate))
  }
  if (filters.email) {
    params.set('email', filters.email)
  }
  if (filters.phone) {
    params.set('phone', filters.phone)
  }

  return params
}
