import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'
import { ProvidersItem, ProvidersItemFromApi } from '../Providers'

export interface BuyersItemFromApi {
  id: number
  name: string
  group: string | null
  buyer_provider_id: number
  provider_id: number
  provider: ProvidersItemFromApi
  user_id: number | null
  created_at: string
  updated_at: any
}

export interface BuyersItem {
  id: number
  name: string
  buyerProviderId: number
  provider: ProvidersItem
  userId: number | null
}

export interface BuyersForm extends Omit<BuyersItem, 'provider' | 'userId'> {
  provider: Option
}

export interface BuyersFilter extends Partial<BuyersForm> {
  buyerProviderId?: string | null
  provider?: Option | null
  userId?: Option | null
}

export interface BuyersToAPI
  extends Omit<
    BuyersItemFromApi,
    'created_at' | 'updated_at' | 'updated_at' | 'user_id' | 'group' | 'provider'
  > {
  provider_id: string
  form: {
    provider_select: string
  }
}
