export interface PubIdsItemFromApi {
  id: number
  name: string
  cpl: Cpl
  pubs: PubFromAPI[]
}

export type Cpl = Record<string, number>

export interface PubFromAPI {
  id: number
  offer_id: number
  pub_list_id: number
  setup: Setup
  interleave: any
  offers: Offers
}

export interface Setup {
  provider?: Provider
  phone_room?: PhoneRoom
  call_center?: CallCenter
  traffic_source?: TrafficSource
}

export interface CallCenter {
  id: string
  list_id: string[]
  campaign_id: string
}

export interface Provider {
  '1': boolean
  '2': boolean
  type: boolean
}

export interface PhoneRoom {
  '1': boolean
  '2': boolean
  '3': boolean
  '4': boolean
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

export interface PubIdItem {
  id: number
  name: string
  cpl: Cpl
  ACA: PubIdOffer
  MC: PubIdOffer
}

export interface PubIdOffer {
  id: number
  sendToTD: boolean
  sendToTrualliant: boolean
  sendToPhoneRoom2: boolean
  sendToConvoso: boolean
  interleave: boolean
  listId?: string
  campaignId?: string
  trafficSourceId?: string
  callCenterId?: string
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
