import { Filters } from 'types/filter'
import { OffersForm, OffersItem, OffersItemFromApi, OffersToAPI } from '../../types/Offers'
import { multipleSelectToApi } from 'src/transformers/apiTransformers'
import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export const transformFiltersToApi = (filters: Filters): Filters => {
  const filter = []

  if (filters.name) {
    filter.push({
      field: 'name',
      type: 'like',
      value: filters.name,
    })
  }

  if (filters.provider) {
    filter.push({
      field: 'provider_id',
      type: 'like',
      value: filters.provider.id,
    })
  }

  if (filters.sourceUrl) {
    filter.push({
      field: 'source_url',
      type: 'like',
      value: filters.sourceUrl,
    })
  }

  if (filters.type) {
    filter.push({
      field: 'type',
      type: 'like',
      value: filters.type,
    })
  }

  return {
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const offersItemFromApi = (
  data: OffersItemFromApi,
  providersOptions: Option[]
): OffersItem => {
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
    provider: providersOptions.find((option) => String(option.id) === String(providerId))!,
  }
}

export const offersToForm = (data: OffersItem): OffersForm => {
  const { id, name, sourceUrl, type, provider, apiKey } = data
  return {
    id,
    name,
    type: { id: type, title: type },
    sourceUrl,
    provider,
    apiKey,
  }
}

export const offersEditedToAPI = (data: OffersForm): OffersToAPI => {
  const { name, apiKey, provider, id, type, sourceUrl } = data

  return {
    id,
    name,
    api_key: apiKey,
    provider_id: String(provider.id),
    source_url: sourceUrl,
    type: String(type.id),
    form: {
      type_select: String(type.id),
      provider_select: String(provider.id),
    },
  }
}
