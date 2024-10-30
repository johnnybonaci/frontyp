import { lazy } from 'react'
import loadable from 'components/Loadable'

export const CPA_REPORT_PATHS = {
  LIST: '/administration/cpa-report',
}

const relativePath = (path: 'LIST'): string =>
  CPA_REPORT_PATHS[path].replace('/administration/', '')

const CPAReportList = loadable(
  lazy(async () => await import('src/features/CPAReport/screen/CPAReportList'))
)

const CPAReportRoutes = [
  {
    path: relativePath('LIST'),
    element: <CPAReportList />,
    permissions: [],
  },
]

export default CPAReportRoutes
