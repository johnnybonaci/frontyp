import * as Yup from 'yup'
import { PubIdForm } from '../../types/PubId'

export const EMPTY_PUBID: PubIdForm = {
  id: 0,
  name: '',
  form: [],
}

const PubIdSchema = Yup.object({
  id: Yup.number().required('validations:required'),
  name: Yup.string().required('validations:required'),
  form: Yup.array().of(
    Yup.object({
      keyu: Yup.string(),
      cpl: Yup.string(),
      user: Yup.object({
        id: Yup.string(),
        title: Yup.string(),
      }).required('validations:required'),
    })
  ),
})

export default PubIdSchema
