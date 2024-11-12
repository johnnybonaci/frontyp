import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export interface BuyersItemFromApi {
  id: number
  name: string
  group: string | null
  buyer_provider_id: number
  provider_id: number
  user_id: number | null
  created_at: string
  updated_at: any
}

export interface BuyersItem {
  id: number
  name: string
  buyerProviderId: number
  providerId: number
  userId: number | null
}

export interface BuyersForm extends Omit<BuyersItem, 'providerId' | 'userId'> {
  provider: Required<Option>
}

export interface BuyersFilter extends Partial<BuyersForm> {
  buyerProviderId?: string | null
  provider?: Option | null
  userId?: Option | null
}

export interface BuyersToAPI
  extends Omit<
    BuyersItemFromApi,
    'created_at' | 'updated_at' | 'updated_at' | 'user_id' | 'group'
  > {
  provider_id: string
  form: {
    provider_select: string
  }
}
