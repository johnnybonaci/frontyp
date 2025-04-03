import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const PHONE_ROOM_REPORTS_PATHS = {
  LIST: '/phone-room-reports',
}

const PhoneRoomReportsList = loadable(
  lazy(async () => await import('src/features/PhoneRoomReports/screen/PhoneRoomReportsList'))
)

const PhoneRoomReportsRoutes = [
  {
    path: PHONE_ROOM_REPORTS_PATHS.LIST,
    element: <PhoneRoomReportsList />,
    permissions: PERMISSIONS.REPORT_PHONE_ROOM,
  },
]

export default PhoneRoomReportsRoutes
