import { type UserItem, type UserItemFromApi } from '../types/index'
import { type Filters } from 'types/filter'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'
import _ from 'lodash'

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
  const filter = []

  if (filters.email) {
    filter.push({
      field: 'email',
      type: 'like',
      value: filters.email,
    })
  }

  if (filters.type) {
    filter.push({
      field: 'type',
      type: 'like',
      value: filters.type,
    })
  }

  if (filters.pubId) {
    filter.push({
      field: 'pub_id',
      type: 'like',
      value: filters.pubId,
    })
  }

  if (filters.userName) {
    filter.push({
      field: 'user_name',
      type: 'like',
      value: filters.userName,
    })
  }

  if (filters.vendors) {
    filter.push({
      field: 'vendors',
      type: 'like',
      value: filters.vendors,
    })
  }

  if (filters.roleName) {
    filter.push({
      field: 'role_name',
      type: 'like',
      value: filters.roleName,
    })
  }

  return {
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}
