import { lazy } from 'react'
import loadable from 'components/Loadable'
import PERMISSIONS from 'permissions'

export const CALL_CAMPAIGN_PATHS = {
  LIST: 'leads/campaign-dashboard',
}

const CallCampaignList = loadable(
  lazy(async () => await import('src/features/CallCampaigns/screen/CallCampaignList'))
)

const CallCampaignRoutes = [
  {
    path: CALL_CAMPAIGN_PATHS.LIST,
    element: <CallCampaignList />,
    permissions: PERMISSIONS.CALLS,
  },
]

export default CallCampaignRoutes
