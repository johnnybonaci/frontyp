import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const LEADREPORT_PATHS = {
  LIST: '/leadReport',
}

const LeadReportList = loadable(
  lazy(async () => await import('src/features/LeadReport/screen/LeadReportList'))
)

const LeadReportRoutes = [
  {
    path: LEADREPORT_PATHS.LIST,
    element: <LeadReportList />,
    permissions: PERMISSIONS.LEADS,
    trackDriveProviderAllowed: ['2'],
  },
]

export default LeadReportRoutes
