import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export interface RoleItemFromApi {
  id: number
  name: string
  permissions: Permission[]
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

export type Permission = string
