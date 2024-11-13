import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
import loadable from 'components/Loadable'

export const SETTINGS_PATHS = {
  BASE: '/settings',
  PUBID: 'pubid',
  OFFERS: 'offers',
  TRAFFIC_SOURCE: 'traffic-source',
  BUYERS: 'buyers',
  PHONE_ROOM: 'phoneroom',
  DID_NUMBER: 'did-number',
  PROVIDER: 'provider',
}

const SettingsLayout = loadable(
  lazy(async () => await import('features/Settings/screens/SettingsLayout'))
)
const PubId = loadable(lazy(async () => await import('features/Settings/screens/PubId')))
const Offers = loadable(lazy(async () => await import('features/Settings/screens/Offers')))
const TrafficSource = loadable(
  lazy(async () => await import('features/Settings/screens/TrafficSource'))
)
const Buyers = loadable(lazy(async () => await import('features/Settings/screens/Buyers')))
const DidNumber = loadable(lazy(async () => await import('features/Settings/screens/DidNumber')))

const SettingsRoutes = [
  {
    element: <SettingsLayout />,
    path: SETTINGS_PATHS.BASE,
    children: [
      { element: <Navigate to={SETTINGS_PATHS.PUBID} />, index: true },
      { element: <PubId />, path: SETTINGS_PATHS.PUBID },
      { element: <Offers />, path: SETTINGS_PATHS.OFFERS },
      { element: <TrafficSource />, path: SETTINGS_PATHS.TRAFFIC_SOURCE },
      { element: <Buyers />, path: SETTINGS_PATHS.BUYERS },
      { element: <DidNumber />, path: SETTINGS_PATHS.DID_NUMBER },
    ],
  },
]

export default SettingsRoutes
