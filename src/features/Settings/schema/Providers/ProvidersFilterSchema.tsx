import { ProvidersFilter } from 'features/Settings/types/Providers'
import * as Yup from 'yup'

export const EMPTY_PROVIDERS_FILTERS: ProvidersFilter = {
  name: '',
  service: '',
  url: '',
  active: 'all',
}

const ProvidersFilterSchema = Yup.object({
  name: Yup.string().nullable(),
  service: Yup.string().nullable(),
  url: Yup.string().nullable(),
  active: Yup.mixed().oneOf(['all', true, false]).nullable(),
})

export default ProvidersFilterSchema
