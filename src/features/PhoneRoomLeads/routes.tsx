import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const PHONE_ROOM_LEADS_PATHS = {
  LIST: '/phone-room-leads',
}

const PhoneRoomLeadsList = loadable(
  lazy(async () => await import('src/features/PhoneRoomLeads/screen/PhoneRoomLeadsList'))
)

const PhoneRoomLeadsRoutes = [
  {
    path: PHONE_ROOM_LEADS_PATHS.LIST,
    element: <PhoneRoomLeadsList />,
    permissions: PERMISSIONS.PHONE_ROOM,
    trackDriveProviderAllowed: ['2'],
  },
]

export default PhoneRoomLeadsRoutes
