import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'
import { ProvidersItemFromApi } from '../Providers'

export interface OffersItemFromApi {
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

export interface OffersItem {
  id: number
  name: string
  offerProviderId: number
  type: string
  sourceUrl: string
  apiKey: string
  providerId: number
  provider: Option
}

export interface OffersForm extends Omit<OffersItem, 'providerId' | 'offerProviderId'> {
  type: Option
}

export interface OffersToAPI
  extends Omit<
    OffersItemFromApi,
    'provider' | 'offer_provider_id' | 'created_at' | 'updated_at' | 'updated_at'
  > {
  provider_id: string
  form: {
    type_select: string
    provider_select: string
  }
}

export interface OffersFilter {
  name: string
  type: string
  sourceUrl: string
  provider: string
}
