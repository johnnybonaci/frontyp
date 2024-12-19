import * as Yup from 'yup'
import { RoleForm } from '../types'

export const EMPTY_ROLE: RoleForm = {
  id: 0,
  name: '',
  permissions: [],
}

const RoleSchema = Yup.object({
  name: Yup.string().required('validations:required'),
  permissions: Yup.array().min(1, 'validations:minLenght').required('validations:required'),
})

export default RoleSchema
