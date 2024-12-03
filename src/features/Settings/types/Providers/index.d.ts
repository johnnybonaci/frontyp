import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export interface ProvidersItemFromApi {
  id: number
  name: string
  service: string
  url: string
  api_key: string
  active: number
  created_at: string
  updated_at: string
}

export interface ProvidersItem
  extends Omit<ProvidersItemFromApi, 'api_key' | 'created_at' | 'updated_at'> {
  apiKey: string
}

export interface ProvidersForm extends ProvidersItem {
  active: boolean
}

export interface ProvidersFilter {
  name?: string
  service?: string
  url?: string
  active?: boolean | 'all'
}

export interface ProvidersToAPI
  extends Omit<
    ProvidersItemFromApi,
    'created_at' | 'updated_at' | 'updated_at' | 'user_id' | 'group'
  > {
  active: boolean
  form: {}
}
