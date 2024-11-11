import { Filters } from 'types/filter'
import {
  TrafficSourceForm,
  TrafficSourceItem,
  TrafficSourcesItemFromApi,
  TrafficSourceToAPI,
} from '../types'
import { multipleSelectToApi } from 'src/transformers/apiTransformers'
import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export const transformFiltersFromUrl = (searchParams: URLSearchParams): Record<string, any> => {
  return {
    name: searchParams.get('name') ?? '',
    provider: searchParams.get('provider') ?? '',
    trafficSourceProviderId: searchParams.get('trafficSourceProviderId') ?? '',
  }
}

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

export const transformFiltersToUrl = (filters: Filters): string => {
  const params = new URLSearchParams()
  if (filters.name) {
    params.set('name', filters.name)
  }
  if (filters.provider) {
    params.set('provider', filters.provider)
  }
  if (filters.trafficSourceProviderId) {
    params.set('trafficSourceProviderId', filters.trafficSourceProviderId)
  }
  return params.toString()
}

export const trafficSourcesItemFromApi = (data: TrafficSourcesItemFromApi): TrafficSourceItem => {
  const {
    id,
    name,
    traffic_source_provider_id: trafficSourceProviderId,
    provider_id: providerId,
  } = data
  return {
    id,
    name,
    trafficSourceProviderId,
    providerId,
  }
}

export const trafficSourcesToForm = (
  data: TrafficSourceItem,
  providersOptions: Option[]
): TrafficSourceForm => {
  const { id, trafficSourceProviderId, providerId, name } = data
  return {
    id,
    name,
    trafficSourceProviderId,
    provider: providersOptions.find(
      (option) => Number(option.id) === providerId
    ) as Required<Option>,
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
