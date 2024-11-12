import { Filters } from 'types/filter'
import { BuyersForm, BuyersItem, BuyersItemFromApi, BuyersToAPI } from '../../types/Buyers'
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

  if (filters.buyerProviderId) {
    filter.push({
      field: 'buyer_provider_id',
      type: 'like',
      value: filters.buyerProviderId,
    })
  }

  if (filters.userId) {
    filter.push({
      field: 'user_id',
      type: 'like',
      value: filters.userId.id,
    })
  }

  return {
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const buyersItemFromApi = (data: BuyersItemFromApi): BuyersItem => {
  const {
    id,
    name,
    buyer_provider_id: buyerProviderId,
    provider_id: providerId,
    user_id: userId,
  } = data
  return {
    id,
    name,
    buyerProviderId,
    providerId,
    userId,
  }
}

export const buyersToForm = (data: BuyersItem, providersOptions: Option[]): BuyersForm => {
  const { id, buyerProviderId, providerId, name } = data
  return {
    id,
    name,
    buyerProviderId,
    provider: providersOptions.find(
      (option) => Number(option.id) === providerId
    ) as Required<Option>,
  }
}

export const buyersEditedToAPI = (data: BuyersForm): BuyersToAPI => {
  const { name, buyerProviderId, provider, id } = data

  return {
    id,
    name,
    buyer_provider_id: buyerProviderId,
    provider_id: String(provider.id),
    form: {
      provider_select: String(provider.id),
    },
  }
}
