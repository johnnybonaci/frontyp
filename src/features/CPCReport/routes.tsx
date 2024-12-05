import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const CPC_REPORT_PATHS = {
  LIST: '/cpc-report',
}

const CPCReportList = loadable(
  lazy(async () => await import('src/features/CPCReport/screen/CPCReportList'))
)

const CPCReportRoutes = [
  {
    path: CPC_REPORT_PATHS.LIST,
    element: <CPCReportList />,
    permissions: PERMISSIONS.CALLS,
  },
]

export default CPCReportRoutes
