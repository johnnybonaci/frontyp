import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
import loadable from 'components/Loadable'

export const SETTINGS_PATHS = {
  BASE: '/settings',
  PUBID: 'pubid',
  OFFER: 'offer',
}

const Settings = loadable(lazy(async () => await import('src/features/Settings/screens/Settings')))
const PubId = loadable(lazy(async () => await import('src/features/Settings/components/PubId')))

const SettingsRoutes = [
  {
    element: <Settings />,
    path: SETTINGS_PATHS.BASE,
    children: [
      { element: <Navigate to={SETTINGS_PATHS.PUBID} />, index: true },
      { element: <PubId />, path: SETTINGS_PATHS.PUBID },
    ],
  },
]

export default SettingsRoutes
