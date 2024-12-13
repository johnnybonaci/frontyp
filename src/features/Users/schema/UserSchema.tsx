import * as Yup from 'yup'
import { UserForm } from '../types'
import { MIN_CHARS_FOR_PASSWORD } from 'utils/defaultPasswordValidations'

export const EMPTY_USER: UserForm = {
  userName: '',
  email: '',
  newPassword: '',
  newPasswordConfirmation: '',
  type: { id: '', title: '' },
  pubId: { id: '', title: '' },
  role: { id: '', title: '' },
}

const UserSchema = Yup.object({
  userName: Yup.string().required('validations:required'),
  email: Yup.string().email('validations:invalidEmail').required('validations:required'),
  newPassword: Yup.string()
    .min(MIN_CHARS_FOR_PASSWORD, 'validations:validationMin')
    .strongPassword(),
  newPasswordConfirmation: Yup.string()
    .required('validations:required')
    .oneOf([Yup.ref('newPassword'), ''], 'validations:passwordConfirmationMatch'),
  type: Yup.object().required('validations:required'),
  pubId: Yup.object().required('validations:required'),
  role: Yup.object().required('validations:required'),
})

export default UserSchema
