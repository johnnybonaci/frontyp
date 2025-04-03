import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const CALL_REPORT_PATHS = {
  LIST: '/call-report',
}

// dashboard routing
const CallReportList = loadable(
  lazy(async () => await import('src/features/CallReport/screen/CallReportList'))
)

const CallReportRoutes = [
  {
    path: CALL_REPORT_PATHS.LIST,
    element: <CallReportList />,
    permissions: PERMISSIONS.CALLS,
  },
]

export default CallReportRoutes
