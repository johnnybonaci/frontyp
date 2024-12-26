import { type PhoneRoomPerformanceItem, type PhoneRoomPerformanceItemFromApi } from '../types'
import { type Filters } from 'types/filter'
import { type PhoneRoomPerformanceListFiltersFormValues } from 'features/PhoneRoomPerformance/components/PhoneRoomPerformanceFilters/PhoneRoomPerformanceFilters.tsx'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import { objectFromUrl } from 'utils/utils.ts'

export const phoneRoomPerformanceItemFromApi = (
  item: PhoneRoomPerformanceItemFromApi
): PhoneRoomPerformanceItem => {
  return {
    avgDials: item.avg_dials,
    callCount: item.call_count,
    category: item.category,
    code: item.code,
    contactRate: item.contact_rate,
    costRecord: item.cost_record,
    cpl: item.cpl,
    createdAt: item.created_at,
    data: {
      status: item.data.Status,
      callCount: item.data['Call Count'],
    },
    email: item.email,
    firstName: item.first_name,
    lastName: item.last_name,
    phone: item.phone,
    profitRecord: item.profit_record,
    pubId: item.pub_id,
    pubListId: item.pub_list_id,
    recordCount: item.record_count,
    revRecord: item.rev_record,
    revenue: item.revenue,
    subId: item.sub_id,
    subPub: item.sub_pub,
    transferRate: item.transfer_rate,
    type: item.type,
    vendorsYp: item.vendors_yp,
  }
}

export const transformFiltersToApi = (filters: Filters): Filters => {
  return {
    leads_type: multipleSelectToApi(filters.leadsType),
    pubs_pub1list1id: multipleSelectToApi(filters.pubId),
    subs_id: filters.subId?.value ?? '',
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): PhoneRoomPerformanceListFiltersFormValues => {
  return {
    leadsType: objectFromUrl(searchParams.get('leadsType')),
    pubId: objectFromUrl(searchParams.get('pubId')),
    subId: objectFromUrl(searchParams.get('subId'), null),
  }
}

export const transformFiltersToUrl = (
  filters: PhoneRoomPerformanceListFiltersFormValues
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.pubId?.length) {
    params.set('pubId', JSON.stringify(filters.pubId))
  }

  if (filters.leadsType?.length) {
    params.set('leadsType', JSON.stringify(filters.leadsType))
  }

  if (filters.subId) {
    params.set('subId', JSON.stringify(filters.subId))
  }

  return params
}
