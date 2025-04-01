import { Filters } from 'types/filter'
import { BuyersForm, BuyersItem, BuyersItemFromApi, BuyersToAPI } from '../../types/Buyers'
import { multipleSelectToApi } from 'src/transformers/apiTransformers'
import { providersItemFromApi } from '../Providers'
import { entityToOption } from 'utils/entityToOptions'
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

export const buyersItemFromApi = (data: BuyersItemFromApi, userOptions: Option[]): BuyersItem => {
  const { id, name, buyer_provider_id: buyerProviderId, provider, user_id: userId, revenue } = data
  return {
    id,
    name,
    buyerProviderId,
    provider: providersItemFromApi(provider),
    userId,
    user: userId ? userOptions.find((user) => String(user.id) === String(userId))! : null,
    revenue,
  }
}

export const buyersToForm = (data: BuyersItem): BuyersForm => {
  const { id, buyerProviderId, provider, name, user, revenue } = data
  console.log(provider, 'provider')
  console.log(entityToOption(provider), 'entityToOption(provider)')
  return {
    id,
    name,
    buyerProviderId,
    provider: entityToOption(provider),
    user,
    revenue: revenue ?? '',
  }
}

export const buyersEditedToAPI = (data: BuyersForm): BuyersToAPI => {
  const { name, buyerProviderId, provider, id, user, revenue } = data

  return {
    id,
    name,
    buyer_provider_id: buyerProviderId,
    provider_id: String(provider.id),
    user_id: user ? String(user.id) : null,
    revenue,
    form: {
      provider_select: String(provider.id),
      user_select: String(user?.id),
    },
  }
}
