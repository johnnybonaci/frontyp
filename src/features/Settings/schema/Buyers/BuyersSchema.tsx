import * as Yup from 'yup'
import { BuyersForm } from '../../types/Buyers'

export const EMPTY_BUYERS: BuyersForm = {
  id: 0,
  name: '',
  provider: { id: '', title: '' },
  buyerProviderId: 0,
}

const BuyersSchema = Yup.object({
  id: Yup.number().required('validations:required'),
  provider: Yup.object().required('validations:required'),
  buyerProviderId: Yup.string().required('validations:required'),
})

export default BuyersSchema
