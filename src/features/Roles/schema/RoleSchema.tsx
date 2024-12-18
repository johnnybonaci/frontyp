import * as Yup from 'yup'
import { RoleForm } from '../types'
import { MIN_CHARS_FOR_PASSWORD } from 'utils/defaultPasswordValidations'

export const EMPTY_ROLE: RoleForm = {
  email: '',
  newPassword: '',
  newPasswordConfirmation: '',
  type: null,
  pubId: null,
  role: null,
}

export const RoleCreationSchema = Yup.object({
  roleName: Yup.string().required('validations:required'),
  email: Yup.string().email('validations:invalidEmail').required('validations:required'),
  newPassword: Yup.string()
    .required('validations:required')
    .min(MIN_CHARS_FOR_PASSWORD, 'validations:validationMin')
    .strongPassword(),
  newPasswordConfirmation: Yup.string()
    .required('validations:required')
    .oneOf([Yup.ref('newPassword'), ''], 'validations:passwordConfirmationMatch'),
  type: Yup.object().required('validations:required'),
  pubId: Yup.object().required('validations:required'),
  role: Yup.object().required('validations:required'),
})

export const RoleEditionSchema = Yup.object({
  roleName: Yup.string().required('validations:required'),
  email: Yup.string().email('validations:invalidEmail').required('validations:required'),
  newPassword: Yup.string()
    .min(MIN_CHARS_FOR_PASSWORD, 'validations:validationMin')
    .strongPassword(),
  newPasswordConfirmation: Yup.string().oneOf(
    [Yup.ref('newPassword'), ''],
    'validations:passwordConfirmationMatch'
  ),
  type: Yup.object().required('validations:required'),
  pubId: Yup.object().required('validations:required'),
  role: Yup.object().required('validations:required'),
})
