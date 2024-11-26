export interface PhoneRoomsItemFromApi {
  id: number
  name: string
  service: string
  api_key: string
  api_user: string
  config: Config
  active: number
  created_at: string
  updated_at: string
}

export interface Config {
  env_key: string
  list_id: string
  env_user: string
}

export interface PhoneRoomItem {
  id: number
  name: string
  service: string
  apiKey: string
  apiUser: string
  envKey: string
  envUser: string
  listId: string
  active: number
}

export interface PhoneRoomForm extends Omit<PhoneRoomItem, 'providerId'> {
  active: boolean
}

export interface PhoneRoomToAPI
  extends Omit<PhoneRoomsItemFromApi, 'created_at' | 'updated_at' | 'updated_at'> {
  active: boolean
  form: {}
}

export interface PhoneRoomFilter {
  name?: string
  service?: string
  active?: boolean | 'all'
}
