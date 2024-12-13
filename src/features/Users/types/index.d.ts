import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export interface UserItemFromApi {
  id: number
  email: string
  type?: string
  updated_at: string
  pub_id?: number
  user_name: string
  vendors?: string
  role_name?: string
  profile_photo_url: string
}

export interface UserItem {
  id: number
  email: string
  type?: string
  updatedAt: string
  pubId?: number
  userName: string
  vendors?: string
  roleName?: string
  profilePhotoUrl: string
}

export interface UserForm
  extends Omit<UserItem, 'id' | 'profilePhotoUrl' | 'updatedAt' | 'vendors' | 'roleName'> {
  newPassword?: string
  newPasswordConfirmation?: string
  type: Option
  pubId: Option
  role: Option
}

export interface UserListFiltersFormValues {
  email?: string | null
  type?: string | null
  pubId?: string | null
  userName?: string | null
  vendors?: string | null
  roleName?: string | null
}

export interface UserToAPI
  extends Omit<UserItemFromApi, 'id' | 'profile_photo_url' | 'vendors' | 'updated_at'> {
  new_password?: string
  new_password_confirmation?: string
}
