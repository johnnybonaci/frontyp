import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const COMPLIANCE_BOT_PATHS = {
  LIST: '/jornaya-bot',
}

const ComplianceBotList = loadable(
  lazy(async () => await import('src/features/ComplianceBot/screen/ComplianceBotList'))
)

const ComplianceBotRoutes = [
  {
    path: COMPLIANCE_BOT_PATHS.LIST,
    element: <ComplianceBotList />,
    permissions: PERMISSIONS.JORNAYA,
    trackDriveProviderAllowed: ['1'],
  },
]

export default ComplianceBotRoutes
