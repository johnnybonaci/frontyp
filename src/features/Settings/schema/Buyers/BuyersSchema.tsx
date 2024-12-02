import * as Yup from 'yup'
import { BuyersForm } from '../../types/Buyers'

export const EMPTY_BUYERS: BuyersForm = {
  id: 0,
  name: '',
  provider: { id: '', title: '' },
  user: { id: '', title: '' },
  buyerProviderId: 0,
  revenue: '',
}

const BuyersSchema = Yup.object({
  id: Yup.number().required('validations:required'),
  provider: Yup.object().required('validations:required'),
  buyerProviderId: Yup.string().required('validations:required'),
  user: Yup.object().required('validations:required'),
  revenue: Yup.string().required('validations:required'),
})

export default BuyersSchema
