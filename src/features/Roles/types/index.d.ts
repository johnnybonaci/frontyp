import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export interface RoleItemFromApi {
  id: number
  email: string
  type?: string
  updated_at: string
  pub_id?: number
  role_name: string
  vendors?: string
  profile_photo_url: string
}

export interface RoleItem {
  id: number
  email: string
  type?: string
  updatedAt: string
  pubId?: number
  roleName: string
  vendors?: string
  roleName?: string
  profilePhotoUrl: string
}

export interface RoleForm
  extends Omit<RoleItem, 'id' | 'profilePhotoUrl' | 'updatedAt' | 'vendors' | 'roleName'> {
  newPassword?: string
  newPasswordConfirmation?: string
  type: Option | null
  pubId: Option | null
  role: Option | null
}

export interface RoleListFiltersFormValues {
  email?: string | null
  type?: string | null
  pubId?: string | null
  roleName?: string | null
  vendors?: string | null
}

export interface RoleToAPI {
  name: string
  email: string
  password?: string
  password_confirmation?: string
  type_selected?: string
  pub_id_selected?: string
  role_selected?: string
}
