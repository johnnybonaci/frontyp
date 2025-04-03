import { PhoneRoomFilter } from 'features/Settings/types/PhoneRoom'
import * as Yup from 'yup'

export const EMPTY_PHONE_ROOM_FILTERS: PhoneRoomFilter = {
  name: '',
  service: '',
  active: 'all',
}

const PhoneRoomFiltersSchema = Yup.object({
  name: Yup.string().nullable(),
  service: Yup.string().nullable(),
  active: Yup.mixed().oneOf(['all', true, false]).nullable(),
})

export default PhoneRoomFiltersSchema
