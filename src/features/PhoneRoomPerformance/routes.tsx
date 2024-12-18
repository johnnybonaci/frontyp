import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const PHONE_ROOM_PERFORMANCE_PATHS = {
  LIST: '/phone-room-performance',
}

const PhoneRoomPerformanceList = loadable(
  lazy(
    async () => await import('src/features/PhoneRoomPerformance/screen/PhoneRoomPerformanceList')
  )
)

const PhoneRoomPerformanceRoutes = [
  {
    path: PHONE_ROOM_PERFORMANCE_PATHS.LIST,
    element: <PhoneRoomPerformanceList />,
    permissions: PERMISSIONS.PERFORMANCE,
    trackDriveProviderAllowed: ['2'],
  },
]

export default PhoneRoomPerformanceRoutes
