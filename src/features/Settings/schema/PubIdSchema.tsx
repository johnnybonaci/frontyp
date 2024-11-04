import * as Yup from 'yup'
import { PubIdForm } from '../types'

export const EMPTY_PUBID: PubIdForm = {
  name: '',
  form: [],
}

const PubIdSchema = Yup.object({
  name: Yup.string().required('validations:required'),
  form: Yup.array().of(
    Yup.object({
      keyu: Yup.string(),
      cpl: Yup.string(),
      user: Yup.string(),
    })
  ),
})

export default PubIdSchema
