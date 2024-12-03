import * as Yup from 'yup'
import { PhoneRoomForm } from '../../types/PhoneRoom'

export const EMPTY_PHONE_ROOM: PhoneRoomForm = {
  id: 0,
  name: '',
  service: '',
  apiKey: '',
  apiUser: '',
  envKey: '',
  envUser: '',
  listId: '',
  active: true,
}

const PhoneRoomSchema = Yup.object({
  id: Yup.number().required('validations:required'),
  name: Yup.string().required('validations:required'),
  service: Yup.string().required('validations:required'),
  apiKey: Yup.string(),
  apiUser: Yup.string().required('validations:required'),
  envKey: Yup.string().required('validations:required'),
  envUser: Yup.string().required('validations:required'),
  listId: Yup.string().required('validations:required'),
  active: Yup.boolean().required('validations:required'),
})

export default PhoneRoomSchema
