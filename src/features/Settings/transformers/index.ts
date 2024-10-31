import { Filters } from 'types/filter'

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
  const { id, name } = data

  return {
    id,
    name,
  }
}
