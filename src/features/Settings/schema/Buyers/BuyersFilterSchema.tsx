import { BuyersFilter } from 'features/Settings/types/Buyers'
import * as Yup from 'yup'

export const EMPTY_BUYERS_FILTERS: BuyersFilter = {
  name: '',
  provider: '',
  buyerProviderId: undefined,
}

const BuyersFilterSchema = Yup.object({
  name: Yup.string().nullable(),
  provider: Yup.object().nullable(),
  buyerProviderId: Yup.string().nullable(),
})

export default BuyersFilterSchema
