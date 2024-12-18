import _ from 'lodash'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'

import { type Filters } from 'types/filter'
import { RoleToAPI, type RoleForm, type RoleItem, type RoleItemFromApi } from '../types/index'
import dateFromUrl from 'utils/dateFromUrl.ts'

export const roleItemFromApi = (item: RoleItemFromApi): RoleItem => {
  const { id, name, permissions, created_at, updated_at } = item

  return {
    id,
    name,
    permissions,
    createdAt: dateFromUrl(created_at),
    updatedAt: dateFromUrl(updated_at),
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

  if (filters.roleName) {
    filter.push({
      field: 'role_name',
      type: 'like',
      value: filters.roleName,
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

export const roleToForm = (data: RoleItem): RoleForm => {
  const { id, name, permissions } = data

  return {
    id,
    name,
    permissions,
  }
}

export const roleEditedToAPI = (data: RoleForm): RoleToAPI => {
  const { name, permissions } = data

  return {
    name,
    permissions,
  }
}
