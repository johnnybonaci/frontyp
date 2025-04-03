import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const PUB_LEADS_PATHS = {
  LIST: '/pub-leads',
}

// dashboard routing
const PubLeadsList = loadable(
  lazy(async () => await import('src/features/PubLeads/screen/PubLeadsList'))
)

const PubLeadsRoutes = [
  {
    path: PUB_LEADS_PATHS.LIST,
    element: <PubLeadsList />,
    permissions: PERMISSIONS.LEADS,
  },
]

export default PubLeadsRoutes
