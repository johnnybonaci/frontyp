import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const ACTIVE_LEADS_PATHS = {
  LIST: '/active-leads',
}

// dashboard routing
const ActiveLeadsList = loadable(
  lazy(async () => await import('src/features/ActiveLeads/screen/ActiveLeadsList'))
)

const ActiveLeadsRoutes = [
  {
    path: ACTIVE_LEADS_PATHS.LIST,
    element: <ActiveLeadsList />,
    permissions: PERMISSIONS.LEADS,
  },
]

export default ActiveLeadsRoutes
