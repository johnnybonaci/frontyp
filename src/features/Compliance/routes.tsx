import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const COMPLIANCE_PATHS = {
  LIST: '/compliance',
}

const ComplianceList = loadable(
  lazy(async () => await import('src/features/Compliance/screen/ComplianceList'))
)

const ComplianceRoutes = [
  {
    path: COMPLIANCE_PATHS.LIST,
    element: <ComplianceList />,
    permissions: PERMISSIONS.JORNAYA,
    trackDriveProviderAllowed: ['2'],
  },
]

export default ComplianceRoutes
