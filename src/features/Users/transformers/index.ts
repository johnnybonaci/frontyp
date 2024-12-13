import _ from 'lodash'
import { multipleSelectToApi } from '../../../transformers/apiTransformers.ts'

import { type Filters } from 'types/filter'
import { type Option } from 'components/CustomAutocomplete/CustomAutocomplete.tsx'
import { UserToAPI, type UserForm, type UserItem, type UserItemFromApi } from '../types/index'

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

export const userToForm = (
  data: UserItem,
  typeOptions: Option[],
  pubIdOptions: Option[],
  roleOptions: Option[]
): UserForm => {
  const { userName, email, type, pubId, roleName } = data

  return {
    userName,
    email,
    type: typeOptions.find((op) => op.title === type)!,
    pubId: pubIdOptions.find((op) => op.id === pubId)!,
    role: roleOptions.find((op) => op.id === roleName)!,
  }
}

export const userEditedToAPI = (data: UserForm): UserToAPI => {
  const { userName, email, newPassword, newPasswordConfirmation, type, pubId, role } = data

  return {
    user_name: userName,
    email,
    new_password: newPassword,
    new_password_confirmation: newPasswordConfirmation,
    type: type.id,
    pub_id: Number(pubId.id),
    role_name: role.id,
  }
}
