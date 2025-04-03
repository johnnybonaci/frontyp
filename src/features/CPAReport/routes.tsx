import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const CPA_REPORT_PATHS = {
  LIST: '/cpa-report',
}

const CPAReportList = loadable(
  lazy(async () => await import('src/features/CPAReport/screen/CPAReportList'))
)

const CPAReportRoutes = [
  {
    path: CPA_REPORT_PATHS.LIST,
    element: <CPAReportList />,
    permissions: PERMISSIONS.CALLS,
  },
]

export default CPAReportRoutes
