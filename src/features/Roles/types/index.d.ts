import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export interface RoleItemFromApi {
  id: number
  name: string
  permissions: PermissionFromAPI[]
  created_at: string
  updated_at: string
}

export interface RoleItem {
  id: number
  name: string
  permissions: Permission[]
  createdAt: Date
  updatedAt: Date
}

export interface RoleForm extends Pick<RoleItem, 'id' | 'name' | 'permissions'> {}

export interface RoleListFiltersFormValues {
  name?: string | null
}

export interface RoleToAPI extends Pick<RoleItem, 'name' | 'permissions'> {}

export interface PermissionFromAPI {
  id: string
  name: string
  created_at: string
}

export type Permission = string
