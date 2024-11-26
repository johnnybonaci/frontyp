import { DidNumberFilter } from 'features/Settings/types/DidNumber'
import * as Yup from 'yup'

export const EMPTY_DID_NUMBER_FILTERS: DidNumberFilter = {
  id: '',
  description: '',
  campaignName: '',
  subId: '',
  pubId: '',
  trafficSource: null,
  offer: null,
}

const DidNumberFilterSchema = Yup.object({
  id: Yup.number().nullable(),
  description: Yup.string().nullable(),
  campaignName: Yup.string().nullable(),
  subId: Yup.string().nullable(),
  pubId: Yup.string().nullable(),
  trafficSource: Yup.object().nullable(),
  offer: Yup.object().nullable(),
})

export default DidNumberFilterSchema
