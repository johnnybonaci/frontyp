import { lazy } from 'react'
import loadable from 'components/Loadable'

export const ACTIVE_LEADS_PATHS = {
  LIST: '/administration/active-leads',
}

const relativePath = (path: 'LIST'): string =>
  ACTIVE_LEADS_PATHS[path].replace('/administration/', '')

// dashboard routing
const ActiveLeadsList = loadable(
  lazy(async () => await import('src/features/ActiveLeads/screen/ActiveLeadsList'))
)

const ActiveLeadsRoutes = [
  {
    path: relativePath('LIST'),
    element: <ActiveLeadsList />,
    permissions: [],
  },
]

export default ActiveLeadsRoutes
