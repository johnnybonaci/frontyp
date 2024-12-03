import { Filters } from 'types/filter'
import {
  ProvidersFilter,
  ProvidersForm,
  ProvidersItem,
  ProvidersItemFromApi,
  ProvidersToAPI,
} from '../../types/Providers'
import { multipleSelectToApi } from 'src/transformers/apiTransformers'

export const transformFiltersToApi = (filters: ProvidersFilter): Filters => {
  const filter = []

  if (filters.name) {
    filter.push({
      field: 'name',
      type: 'like',
      value: filters.name,
    })
  }

  if (filters.service) {
    filter.push({
      field: 'service',
      type: 'like',
      value: filters.service,
    })
  }

  if (filters.url) {
    filter.push({
      field: 'url',
      type: 'like',
      value: filters.url,
    })
  }

  if (filters.active && filters.active !== 'all') {
    filter.push({
      field: 'active',
      type: 'like',
      value: Number(filters.active),
    })
  }

  return {
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const providersItemFromApi = (data: ProvidersItemFromApi): ProvidersItem => {
  const { id, name, service, url, api_key: apiKey, active } = data
  return {
    id,
    name,
    service,
    url,
    apiKey,
    active,
  }
}

export const providersToForm = (data: ProvidersItem): ProvidersForm => {
  const { id, name, service, url, active } = data

  return {
    id,
    name,
    service,
    url,
    apiKey: '',
    active: Boolean(active),
  }
}

export const providersEditedToAPI = (data: ProvidersForm): ProvidersToAPI => {
  const { id, name, service, url, apiKey, active } = data

  return {
    id,
    name,
    service,
    url,
    api_key: apiKey,
    active: Boolean(active),
    form: {},
  }
}
