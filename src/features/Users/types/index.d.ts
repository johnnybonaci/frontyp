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

export interface UserListFiltersFormValues {
  email?: string | null
  type?: string | null
  pubId?: string | null
  userName?: string | null
  vendors?: string | null
  roleName?: string | null
}
