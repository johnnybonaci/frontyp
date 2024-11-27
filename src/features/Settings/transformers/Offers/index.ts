import { OfferItem, OfferItemFromApi } from 'features/Settings/types/Offers'

export const offerItemFromApi = (data: OfferItemFromApi): OfferItem => {
  const {
    id,
    name,
    offer_provider_id: offerProviderId,
    type,
    source_url: sourceUrl,
    api_key: apiKey,
    provider_id: providerId,
  } = data
  return {
    id,
    name,
    offerProviderId,
    type,
    sourceUrl,
    apiKey,
    providerId,
  }
}
