import { Filters } from 'types/filter'
import { PubIdForm, PubIdItem, PubIdToAPI } from '../types'
import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'
import { generateUniqueId } from 'utils/utils'
import { multipleSelectToApi } from 'src/transformers/apiTransformers'

export const transformFiltersFromUrl = (searchParams: URLSearchParams): Record<string, any> => {
  return {
    name: searchParams.get('name') ?? '',
    pubs: searchParams.get('pubs') ?? '',
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

  if (filters.pubs) {
    filter.push({
      field: 'id',
      type: 'like',
      value: filters.pubs,
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
  if (filters.pubs) {
    params.set('status', filters.pubs)
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
  const { id, name, cpl } = data

  return {
    id,
    name,
    form: Object.keys(cpl).map((key) => ({
      keyu: generateUniqueId(),
      cpl: cpl[key],
      user: userOptions.find((option) => Number(option.id) === Number(key)),
    })),
  }
}

export const pubIdEditedToAPI = (data: PubIdForm): PubIdToAPI => {
  const { form, id, name } = data

  const formData: Record<string, string> = {}

  form.forEach((formItem, index) => {
    formData[`cpl_${index + 1}`] = String(formItem.cpl)
    formData[`keyu_${index + 1}`] = String(index)
    formData[`user_p${index + 1}`] = String(formItem.user.id)
  })

  return {
    id,
    name,
    form: formData,
  }
}
