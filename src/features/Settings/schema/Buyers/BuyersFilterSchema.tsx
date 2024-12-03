import { BuyersFilter } from 'features/Settings/types/Buyers'
import * as Yup from 'yup'

export const EMPTY_BUYERS_FILTERS: BuyersFilter = {
  name: '',
  provider: null,
  buyerProviderId: '',
  userId: null,
}

const BuyersFilterSchema = Yup.object({
  name: Yup.string().nullable(),
  provider: Yup.object().nullable(),
  buyerProviderId: Yup.string().nullable(),
  userId: Yup.object().nullable(),
})

export default BuyersFilterSchema
