import { TrafficSourceItem, TrafficSourcesItemFromApi } from '../TrafficSource'
import { OfferItem, OfferItemFromApi } from '../Offers'
import { type Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export interface DidNumberItemFromApi {
  id: number
  description: string
  campaign_name: string
  sub_id: number
  pub_id: number
  traffic_source_id: number
  traffic_sources: TrafficSourcesItemFromApi
  offer_id: number
  offers: OfferItemFromApi
  created_at: string
  updated_at: string
}

export interface DidNumberItem {
  id: number
  description: string
  campaignName: string
  subId: number
  pubId: number
  trafficSource: TrafficSourceItem
  offer: OfferItem
}

export interface DidNumberForm extends Omit<DidNumberItem, 'subId' | 'pubId'> {
  campaignName: string
  sub: Option | null
  pub: Option | null
  trafficSource: Option | null
  offer: Option | null
}

export interface DidNumberFilter {
  id?: string
  description?: string
  campaignName?: string
  subId?: string
  pubId?: string
  trafficSource?: Option | null
  offer?: Options | null
}

export interface DidNumberToAPI
  extends Omit<
    DidNumberItemFromApi,
    'created_at' | 'updated_at' | 'updated_at' | 'user_id' | 'group' | 'traffic_sources' | 'offers'
  > {
  sub_id: string
  pub_id: string
  traffic_source_id: string
  offer_id: string
  form: {
    form_sub_id: string
    offer_select: string
    pub_select: string
    traffic_source_select: string
  }
}
