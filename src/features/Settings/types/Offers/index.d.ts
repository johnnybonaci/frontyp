export interface OfferItemFromApi {
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

export interface OfferItem {
  id: number
  name: string
  offerProviderId: number
  type: string
  sourceUrl: string
  apiKey: string
  providerId: number
}
