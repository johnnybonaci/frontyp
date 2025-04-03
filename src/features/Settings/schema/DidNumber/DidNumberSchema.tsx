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
  description: Yup.string().nullable(),
  campaignName: Yup.string().nullable(),
  sub: Yup.object().nullable(),
  pub: Yup.object().nullable(),
  trafficSource: Yup.object().required('validations:required'),
  offer: Yup.object().required('validations:required'),
})

export default DidNumberSchema
