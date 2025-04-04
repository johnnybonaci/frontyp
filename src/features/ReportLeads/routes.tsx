import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const REPORT_LEADS_PATHS = {
  LIST: '/leadReport',
}

// dashboard routing
const ReportLeadsList = loadable(
  lazy(async () => await import('src/features/ReportLeads/screen/ReportLeadsList')),
)

const ReportLeadsRoutes = [
  {
    path: REPORT_LEADS_PATHS.LIST,
    element: <ReportLeadsList />,
    permissions: PERMISSIONS.LEADS,
  },
]

export default ReportLeadsRoutes
