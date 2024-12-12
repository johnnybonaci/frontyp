import { type UserItem, type UserItemFromApi } from '../types/index'
import { type Filters } from 'types/filter'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import _ from 'lodash'
import { UserListFiltersFormValues } from '../components/UserFilters/UserFilters.tsx'
import getDayLimits from 'utils/getDayLimits.ts'
import { objectFromUrl } from 'utils/utils.ts'

export const userItemFromApi = (item: UserItemFromApi): UserItem => {
  const { id, email, type, updated_at, pub_id, user_name, vendors, role_name, profile_photo_url } =
    item

  return {
    id,
    email,
    type,
    updatedAt: updated_at,
    pubId: pub_id,
    userName: user_name,
    vendors,
    roleName: role_name,
    profilePhotoUrl: profile_photo_url,
  }
}

export const transformFiltersToApi = (filters: Filters): Filters => {
  return {
    view_by: filters.viewBy,
    date_start: filters.startDate?.toISOString().slice(0, 10),
    date_end: filters.endDate?.toISOString().slice(0, 10),
    pubs_pub1list1id: multipleSelectToApi(filters.pubIdTD),
    leads_cc1id: multipleSelectToApi(filters.ccId),
    leads_type: multipleSelectToApi(filters.type),
    convertions_traffic1source1id: multipleSelectToApi(filters.trafficSourceTD),
    leads_sub1id5: multipleSelectToApi(filters.pubIdYp),
    url_switch: 'campaign-dashboard',
    date_record: 'date_created',
    leads_sub1id3: filters.campaignYP,
  }
}

export const transformFiltersFromUrl = (
  searchParams: URLSearchParams
): UserListFiltersFormValues => {
  const { startOfDay, endOfDay } = getDayLimits()

  return {
    viewBy: searchParams.get('viewBy')
      ? JSON.parse(decodeURIComponent(searchParams.get('viewBy')!))
      : '',
    pubIdTD: objectFromUrl(searchParams.get('pubId')),
    ccId: objectFromUrl(searchParams.get('pubId')),
    startDate: searchParams.get('date_start')
      ? new Date(searchParams.get('date_start')!)
      : startOfDay,
    endDate: searchParams.get('date_end') ? new Date(searchParams.get('date_end')!) : endOfDay,
    type: objectFromUrl(searchParams.get('pubId')),
    trafficSourceTD: objectFromUrl(searchParams.get('pubId')),
    pubIdYp: objectFromUrl(searchParams.get('pubId')),
    campaignYP: searchParams.get('viewBy')
      ? JSON.parse(decodeURIComponent(searchParams.get('viewBy')!))
      : '',
  }
}
