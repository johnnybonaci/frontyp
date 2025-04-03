import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const QA_REPORT_PATHS = {
  LIST: '/qa-report',
}

const QAReportList = loadable(
  lazy(async () => await import('src/features/QAReport/screen/QAReportList'))
)

const QAReportRoutes = [
  {
    path: QA_REPORT_PATHS.LIST,
    element: <QAReportList />,
    permissions: PERMISSIONS.CALLS,
  },
]

export default QAReportRoutes
