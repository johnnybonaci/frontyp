import { OffersFilter } from 'features/Settings/types/Offers'
import * as Yup from 'yup'

export const EMPTY_OFFERS_FILTERS: OffersFilter = {
  name: '',
  type: '',
  sourceUrl: '',
  provider: '',
}

const OffersFiltersSchema = Yup.object({
  name: Yup.string().nullable(),
  type: Yup.string().nullable(),
  sourceUrl: Yup.string().nullable(),
  provider: Yup.object().nullable(),
})

export default OffersFiltersSchema
