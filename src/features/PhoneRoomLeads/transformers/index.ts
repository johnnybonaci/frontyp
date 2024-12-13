import {
  type PhoneRoomLeadsIndicators,
  type PhoneRoomLeadsIndicatorsFromApi,
  type PhoneRoomLeadsItem,
  type PhoneRoomLeadsItemFromApi,
} from '../types'
import { type Filters } from 'types/filter'
import {
  ALL_PHONE_ROOM_LEAD_OPTION,
  type PhoneRoomLeadsFiltersFormValues,
} from 'features/PhoneRoomLeads/components/PhoneRoomLeadsFilters/PhoneRoomLeadsFilters.tsx'
import getDayLimits from 'utils/getDayLimits.ts'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import { objectFromUrl } from 'utils/utils.ts'

export const phoneRoomLeadsItemFromApi = (item: PhoneRoomLeadsItemFromApi): PhoneRoomLeadsItem => {
  return {
    createdAt: item.created_at,
    email: item.email,
    firstName: item.first_name,
    lastName: item.last_name,
    log: item.log,
    phone: item.phone,
    phoneRoomLeadId: item.phone_room_lead_id,
    pubListId: item.pub_list_id,
    request: item.request,
    status: item.status,
    subId: item.sub_id,
    type: item.type,
    vendorsYp: item.vendors_yp,
    yieldproLeadId: item.yieldpro_lead_id,
  }
}

export function phoneRoomLeadsIndicatorsFromApi(
  data: PhoneRoomLeadsIndicatorsFromApi
): PhoneRoomLeadsIndicators {
  return {
    noSent: data.no_sent,
    rejected: data.rejected,
    sent: data.sent,
    success: data.success,
    total: data.total,
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

  if (filters.firstName) {
    filter.push({
      field: 'first_name',
      type: 'like',
      value: filters.firstName,
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
    pubs_pub1list1id: multipleSelectToApi(filters.pubId),
    subs_id: filters.subId?.id,
    campaign1name1id: filters.campaign?.id,
    phone1room1logs_status: filters.status === ALL_PHONE_ROOM_LEAD_OPTION ? null : filters.status,
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): PhoneRoomLeadsFiltersFormValues => {
  const { startOfDay, endOfDay } = getDayLimits()

  return {
    phone: searchParams.get('phone') ?? '',
    firstName: searchParams.get('firstName') ?? '',
    email: searchParams.get('email') ?? '',
    leadsType: objectFromUrl(searchParams.get('subId'), null),
    startDate: searchParams.get('date_start')
      ? new Date(searchParams.get('date_start')!)
      : startOfDay,
    subId: objectFromUrl(searchParams.get('subId'), null),
    pubId: objectFromUrl(searchParams.get('pubId')),
    status: searchParams.get('status') ?? '',
    campaign: objectFromUrl(searchParams.get('campaign'), null),
    endDate: searchParams.get('date_end') ? new Date(searchParams.get('date_end')!) : endOfDay,
  }
}

export const transformFiltersToUrl = (
  filters: PhoneRoomLeadsFiltersFormValues
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.phone) {
    params.set('phone', filters.phone)
  }

  if (filters.firstName) {
    params.set('firstName', filters.firstName)
  }

  if (filters.email) {
    params.set('email', filters.email)
  }

  if (filters.pubId?.length) {
    params.set('pubId', JSON.stringify(filters.pubId))
  }

  if (filters.subId) {
    params.set('subId', JSON.stringify(filters.subId))
  }

  if (filters.campaign) {
    params.set('campaign', JSON.stringify(filters.campaign))
  }

  if (filters.status) {
    params.set('status', filters.status)
  }

  if (filters.startDate) {
    params.set('date_start', filters.startDate.toISOString())
  }
  if (filters.endDate) {
    params.set('date_end', filters.endDate.toISOString())
  }

  return params
}
