import { Filters } from 'types/filter'
import { PubIdForm, PubIdItem } from '../types'
import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export const transformFiltersFromUrl = (data: URLSearchParams): Filters => {
  const filters: Filters = {
    name: data.get('name') ?? '',
    status: data.get('status') ?? '',
  }
  return filters
}

export const transformFiltersToApi = (filters: Filters): Filters => {
  return filters
}

export const transformFiltersToUrl = (filters: Filters): string => {
  const params = new URLSearchParams()
  if (filters.name) {
    params.set('name', filters.name)
  }
  if (filters.status) {
    params.set('status', filters.status)
  }
  return params.toString()
}

export const pubIdsItemFromApi = (data: any): any => {
  const { id, name, cpl } = data

  return {
    id,
    name,
    cpl,
  }
}

export const pubIdsToForm = (data: PubIdItem, userOptions: Option[]): PubIdForm => {
  const { name, cpl } = data

  return {
    name,
    form: Object.keys(cpl).map((key, index) => ({
      keyu: String(index),
      cpl: cpl[key],
      user: userOptions.find((option) => Number(option.id) === Number(key)),
    })),
  }
}
