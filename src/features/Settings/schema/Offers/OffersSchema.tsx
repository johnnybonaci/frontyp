import * as Yup from 'yup'
import { OffersForm } from '../../types/Offers'

export const EMPTY_OFFERS: OffersForm = {
  id: 0,
  name: '',
  provider: { id: '', title: '' },
  type: { id: '', title: '' },
  sourceUrl: '',
  apiKey: '',
}

const OffersSchema = Yup.object({
  id: Yup.number().required('validations:required'),
  name: Yup.string().required('validations:required'),
  provider: Yup.object().required('validations:required'),
  type: Yup.object().required('validations:required'),
  sourceUrl: Yup.string().required('validations:required'),
  apiKey: Yup.string().nullable(),
})

export default OffersSchema
