import _ from 'lodash'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'

import { type Filters } from 'types/filter'
import { type Option } from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import { RoleToAPI, type RoleForm, type RoleItem, type RoleItemFromApi } from '../types/index'

export const roleItemFromApi = (item: RoleItemFromApi): RoleItem => {
  const { id, email, type, updated_at, pub_id, role_name, vendors, profile_photo_url } = item

  return {
    id,
    email,
    type,
    updatedAt: updated_at,
    pubId: pub_id,
    roleName: role_name,
    vendors,
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

export const roleToForm = (
  data: RoleItem,
  typeOptions: Option[],
  pubIdOptions: Option[],
  roleOptions: Option[]
): RoleForm => {
  const { roleName, email, type, pubId } = data

  return {
    email,
    type: typeOptions.find((op) => op.title === type) || null,
    pubId: pubIdOptions.find((op) => op.id === pubId) || null,
    role: roleOptions.find((op) => op.id === roleName) || null,
  }
}

export const roleEditedToAPI = (data: RoleForm): RoleToAPI => {
  const { email, newPassword, newPasswordConfirmation, type, pubId, role } = data

  return {
    name: 'name',
    email,
    password: newPassword,
    password_confirmation: newPasswordConfirmation,
    type_selected: type?.id,
    pub_id_selected: pubId?.id,
    role_selected: role?.id,
  }
}
