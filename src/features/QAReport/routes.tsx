import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const QA_REPORT_PATHS = {
  LIST: '/administration/qa-report',
}

const relativePath = (path: 'LIST'): string => QA_REPORT_PATHS[path].replace('/administration/', '')

const QAReportList = loadable(
  lazy(async () => await import('src/features/QAReport/screen/QAReportList'))
)

const QAReportRoutes = [
  {
    path: relativePath('LIST'),
    element: <QAReportList />,
    permissions: PERMISSIONS.CALLS,
  },
]

export default QAReportRoutes
