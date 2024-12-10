import { Filters } from 'types/filter'
import {
  TrafficSourceForm,
  TrafficSourceItem,
  TrafficSourcesItemFromApi,
  TrafficSourceToAPI,
} from '../../types/TrafficSource'
import { multipleSelectToApi } from 'src/transformers/apiTransformers'

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

  if (filters.trafficSourceProviderId) {
    filter.push({
      field: 'traffic_source_provider_id',
      type: 'like',
      value: filters.trafficSourceProviderId,
    })
  }

  return {
    filter: multipleSelectToApi(filter, (item) => {
      return { field: item.field, type: item.type, value: item.value }
    }),
  }
}

export const trafficSourcesItemFromApi = (data: TrafficSourcesItemFromApi): TrafficSourceItem => {
  const { id, name, traffic_source_provider_id: trafficSourceProviderId, provider } = data
  return {
    id,
    name,
    trafficSourceProviderId,
    provider,
  }
}

export const trafficSourcesToForm = (data: TrafficSourceItem): TrafficSourceForm => {
  const { id, trafficSourceProviderId, name, provider } = data
  return {
    id,
    name,
    trafficSourceProviderId,
    provider: { id: provider.id, title: provider.name },
  }
}

export const trafficSourceEditedToAPI = (data: TrafficSourceForm): TrafficSourceToAPI => {
  const { name, trafficSourceProviderId, provider, id } = data

  return {
    id,
    name,
    traffic_source_provider_id: trafficSourceProviderId,
    provider_id: String(provider.id),
    form: {
      provider_select: String(provider.id),
    },
  }
}
