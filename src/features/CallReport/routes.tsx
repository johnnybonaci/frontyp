import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const CALL_REPORT_PATHS = {
  LIST: '/administration/call-report',
}

const relativePath = (path: 'LIST'): string =>
  CALL_REPORT_PATHS[path].replace('/administration/', '')

// dashboard routing
const CallReportList = loadable(
  lazy(async () => await import('src/features/CallReport/screen/CallReportList'))
)

const CallReportRoutes = [
  {
    path: relativePath('LIST'),
    element: <CallReportList />,
    permissions: PERMISSIONS.CALLS,
  },
]

export default CallReportRoutes
