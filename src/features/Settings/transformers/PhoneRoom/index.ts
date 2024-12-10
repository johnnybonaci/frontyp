import { Filters } from 'types/filter'
import {
  PhoneRoomFilter,
  PhoneRoomForm,
  PhoneRoomItem,
  PhoneRoomsItemFromApi,
  PhoneRoomToAPI,
} from '../../types/PhoneRoom'
import { multipleSelectToApi } from 'src/transformers/apiTransformers'

export const transformFiltersToApi = (filters: PhoneRoomFilter): Filters => {
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

export const phoneRoomsItemFromApi = (data: PhoneRoomsItemFromApi): PhoneRoomItem => {
  const { id, name, service, active, config, api_key, api_user } = data
  const { env_key, env_user, list_id } = config

  return {
    id,
    name,
    service,
    apiKey: api_key,
    apiUser: api_user,
    envKey: env_key,
    envUser: env_user,
    listId: list_id,
    active,
  }
}

export const phoneRoomsToForm = (data: PhoneRoomItem): PhoneRoomForm => {
  const { id, name, service, envKey, envUser, listId, active, apiKey, apiUser } = data

  return {
    id,
    name,
    service,
    apiUser,
    apiKey,
    envKey,
    envUser,
    listId,
    active: Boolean(active),
  }
}

export const phoneRoomEditedToAPI = (data: PhoneRoomForm): PhoneRoomToAPI => {
  const { id, name, service, apiKey, apiUser, envKey, envUser, listId, active } = data

  return {
    id,
    name,
    service,
    api_key: apiKey,
    api_user: apiUser,
    config: {
      env_key: envKey,
      env_user: envUser,
      list_id: listId,
    },
    active: Number(active),
    form: {},
  }
}
