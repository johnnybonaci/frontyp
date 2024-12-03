import * as Yup from 'yup'
import { ProvidersForm } from '../../types/Providers'

export const EMPTY_PROVIDERS: ProvidersForm = {
  id: 0,
  name: '',
  service: '',
  url: '',
  apiKey: '',
  active: true,
}

const ProvidersSchema = Yup.object({
  id: Yup.number().required('validations:required'),
  name: Yup.string().required('validations:required'),
  service: Yup.string().required('validations:required'),
  url: Yup.string().required('validations:required'),
  apiKey: Yup.string(),
  active: Yup.boolean().required('validations:required'),
})

export default ProvidersSchema
