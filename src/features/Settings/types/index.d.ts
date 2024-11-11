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

interface PubIdItem {
  id: number
  name: string
  cpl: Record<string, string>
}

export interface PubIdListFiltersFormValues {
  pubId: Option[]
  trafficSource: string
  subId: Option[]
  leadsType: Option[]
  startDate: Date | null
  endDate: Date | null
  status: string
  phone: string
  firstName: string
  lastName: string
  name: string
  email: string
  campaign: string
}

export interface PubIdForm {
  id: number
  name: string
  form: {
    keyu: string
    cpl: string
    user: Option
  }[]
}

export interface PubIdToAPI {
  id: number
  name: string
  form: Record<string, string>
}

export interface TrafficSourcesItemFromApi {
  id: number
  name: string
  traffic_source_provider_id: number
  provider_id: number
  created_at: string
  updated_at: string
}

export interface TrafficSourceItem {
  id: number
  name: string
  trafficSourceProviderId: number
  providerId: number
}

export interface TrafficSourceForm extends Omit<TrafficSourceItem, 'id'> {}

export interface TrafficSourceToAPI
  extends Omit<TrafficSourcesItemFromApi, 'id' | 'created_at' | 'updated_at' | 'updated_at'> {}
