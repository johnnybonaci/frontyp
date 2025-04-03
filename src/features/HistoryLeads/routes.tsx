import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const HISTORYLEADS_PATHS = {
  LIST: '/historyLeads',
}

const HistoryLeadsList = loadable(
  lazy(async () => await import('src/features/HistoryLeads/screen/HistoryLeadsList'))
)

const HistoryLeadsRoutes = [
  {
    path: HISTORYLEADS_PATHS.LIST,
    element: <HistoryLeadsList />,
    permissions: PERMISSIONS.LEADS,
    trackDriveProviderAllowed: ['2'],
  },
]

export default HistoryLeadsRoutes
