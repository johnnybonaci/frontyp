import { Filters } from 'types/filter'
import { BuyersForm, BuyersItem, BuyersItemFromApi, BuyersToAPI } from '../../types/Buyers'
import { multipleSelectToApi } from 'src/transformers/apiTransformers'
import { providersItemFromApi } from '../Providers'
import { entityToOption } from 'utils/entityToOptions'

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
  const { id, name, buyer_provider_id: buyerProviderId, provider, user_id: userId } = data
  return {
    id,
    name,
    buyerProviderId,
    provider: providersItemFromApi(provider),
    userId,
  }
}

export const buyersToForm = (data: BuyersItem): BuyersForm => {
  const { id, buyerProviderId, provider, name } = data
  return {
    id,
    name,
    buyerProviderId,
    provider: entityToOption(provider),
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
