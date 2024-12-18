import { type PhoneRoomReportsItem, type PhoneRoomReportsItemFromApi } from '../types'
import { type Filters } from 'types/filter'
import {
  ALL_CATEGORY_OPTION,
  PHONE_ROOM_OPTIONS,
  type PhoneRoomReportsListFiltersFormValues,
} from 'features/PhoneRoomReports/components/PhoneRoomReportsFilters/PhoneRoomReportsFilters.tsx'
import getDayLimits from 'utils/getDayLimits.ts'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import { objectFromUrl } from 'utils/utils.ts'

export const phoneRoomReportsItemFromApi = (
  item: PhoneRoomReportsItemFromApi
): PhoneRoomReportsItem => {
  return {
    callCount: item.call_count,
    category: item.category,
    code: item.code,
    created: item.created,
    createdAt: item.created_at,
    description: item.description,
    email: item.email,
    firstName: item.first_name,
    lastName: item.last_name,
    phone: item.phone,
    pubId: item.pub_id,
    pubListId: item.pub_list_id,
    subId: item.sub_id,
    type: item.type,
    updated: item.updated,
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

  return {
    calls1phone1rooms_type: multipleSelectToApi(filters.leadsType),
    date_start: filters.startDate?.toISOString().slice(0, 10),
    date_end: filters.endDate?.toISOString().slice(0, 10),
    pubs_pub1list1id: multipleSelectToApi(filters.pubId),
    phone1room1logs_status: 1,
    phone1room1logs_phone1room1id: 2,
    category: filters.category === ALL_CATEGORY_OPTION ? '' : filters.category,
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): PhoneRoomReportsListFiltersFormValues => {
  const { startOfDay, endOfDay } = getDayLimits()

  return {
    phone: searchParams.get('phone') ?? '',
    phoneRoom: searchParams.get('phoneRoom') ?? PHONE_ROOM_OPTIONS[0].id,
    category: searchParams.get('category') ?? '',
    pubId: objectFromUrl(searchParams.get('pubId')),
    leadsType: objectFromUrl(searchParams.get('leadsType')),
    startDate: searchParams.get('date_start')
      ? new Date(searchParams.get('date_start')!)
      : startOfDay,
    endDate: searchParams.get('date_end') ? new Date(searchParams.get('date_end')!) : endOfDay,
  }
}

export const transformFiltersToUrl = (
  filters: PhoneRoomReportsListFiltersFormValues
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.phone) {
    params.set('phone', filters.phone)
  }
  if (filters.phoneRoom) {
    params.set('phoneRoom', filters.phoneRoom)
  }
  if (filters.pubId?.length) {
    params.set('pubId', JSON.stringify(filters.pubId))
  }
  if (filters.leadsType?.length) {
    params.set('leadsType', JSON.stringify(filters.leadsType))
  }
  if (filters.category) {
    params.set('category', filters.category)
  }
  if (filters.startDate) {
    params.set('date_start', filters.startDate.toISOString())
  }
  if (filters.endDate) {
    params.set('date_end', filters.endDate.toISOString())
  }

  return params
}
