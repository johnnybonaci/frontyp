import * as Yup from 'yup'

export const EMPTY_PUBID_FILTERS = {
  pubs: '',
  name: '',
}

const PubIdFiltersSchema = Yup.object({
  pubs: Yup.string().nullable(),
  name: Yup.string().nullable(),
})

export default PubIdFiltersSchema
