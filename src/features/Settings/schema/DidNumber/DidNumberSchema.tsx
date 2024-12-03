import * as Yup from 'yup'
import { DidNumberForm } from '../../types/DidNumber'

export const EMPTY_BUYERS: DidNumberForm = {
  id: 0,
  description: '',
  campaignName: '',
  sub: null,
  pub: null,
  trafficSource: null,
  offer: null,
}

const DidNumberSchema = Yup.object({
  id: Yup.number().required('validations:required'),
  description: Yup.string(),
  campaignName: Yup.string(),
  sub: Yup.object(),
  pub: Yup.object(),
  trafficSource: Yup.object().required('validations:required'),
  offer: Yup.object().required('validations:required'),
})

export default DidNumberSchema
