import * as Yup from 'yup'
import { UserForm } from '../types'
import { MIN_CHARS_FOR_PASSWORD } from 'utils/defaultPasswordValidations'
import { USER_TYPES } from 'utils/constants'
import { Option } from 'components/CustomAutocomplete/CustomAutocomplete'

export const EMPTY_USER: UserForm = {
  userName: '',
  email: '',
  newPassword: '',
  newPasswordConfirmation: '',
  type: null,
  pubId: null,
  role: null,
}

export const UserCreationSchema = Yup.object({
  userName: Yup.string()
    .min(3, 'validations:validationNameMinLenght')
    .required('validations:required'),
  email: Yup.string().email('validations:invalidEmail').required('validations:required'),
  newPassword: Yup.string()
    .required('validations:required')
    .min(MIN_CHARS_FOR_PASSWORD, 'validations:validationMin')
    .strongPassword(),
  newPasswordConfirmation: Yup.string()
    .required('validations:required')
    .oneOf([Yup.ref('newPassword'), ''], 'validations:passwordConfirmationMatch'),
  type: Yup.object().required('validations:required'),
  pubId: Yup.object().when('type', {
    is: (type?: Option) => type?.id === USER_TYPES.USER,
    then: (schema) => schema.nullable(),
    otherwise: (schema) => schema.required('validations:required'),
  }),
  role: Yup.object().required('validations:required'),
})

export const UserEditionSchema = Yup.object({
  userName: Yup.string()
    .min(3, 'validations:validationNameMinLenght')
    .required('validations:required'),
  email: Yup.string().email('validations:invalidEmail').required('validations:required'),
  newPassword: Yup.string()
    .min(MIN_CHARS_FOR_PASSWORD, 'validations:validationMin')
    .strongPassword(),
  newPasswordConfirmation: Yup.string().oneOf(
    [Yup.ref('newPassword'), ''],
    'validations:passwordConfirmationMatch'
  ),
  type: Yup.object().required('validations:required'),
  pubId: Yup.object().when('type', {
    is: (type?: Option) => type?.id === USER_TYPES.USER,
    then: (schema) => schema.nullable(),
    otherwise: (schema) => schema.required('validations:required'),
  }),
  role: Yup.object().required('validations:required'),
})
