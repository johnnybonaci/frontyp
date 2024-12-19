import _ from 'lodash'

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
  return {
    search: filters.name,
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
