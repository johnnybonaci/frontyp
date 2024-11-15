import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const LIVE_LEADS_PATHS = {
  LIST: '/administration/pub-leads',
}

const relativePath = (path: 'LIST'): string =>
  LIVE_LEADS_PATHS[path].replace('/administration/', '')

// dashboard routing
const PubLeadsList = loadable(
  lazy(async () => await import('src/features/PubLeads/screen/PubLeadsList'))
)

const PubLeadsRoutes = [
  {
    path: relativePath('LIST'),
    element: <PubLeadsList />,
    permissions: PERMISSIONS.LEADS,
  },
]

export default PubLeadsRoutes
