import { SETTINGS_PATHS } from '../routes'

type SettingKeys = keyof typeof SETTINGS_PATHS
interface SettingTab {
  label: string
  path: (typeof SETTINGS_PATHS)[SettingKeys]
}

export interface PubIdsItemFromApi {
  id: number
  name: string
  cpl: Cpl
  pubs: Pub[]
}

export interface Cpl {
  '1': number
}

export interface Pub {
  id: number
  offer_id: number
  pub_list_id: number
  setup: Setup
  interleave: any
  offers: Offers
}

export interface Setup {
  provider: Provider
  phone_room: PhoneRoom
}

export interface Provider {
  '1': boolean
  '2': boolean
  type: boolean
}

export interface PhoneRoom {
  '1': boolean
  '2': boolean
  type: boolean
}

export interface Offers {
  id: number
  name: string
  offer_provider_id: number
  type: string
  source_url: string
  api_key: string
  provider_id: number
  created_at: string
  updated_at: any
}

interface PubIdItem {}
