import { lazy } from 'react'
import loadable from 'components/Loadable'
import PubId from './components/PubId'
import { Navigate } from 'react-router-dom'

export const SETTINGS_PATHS = {
  BASE: 'settings',
  PUBID: 'pubid',
  OFFER: 'offer',
}

const Settings = loadable(lazy(async () => await import('src/features/Settings/screens/Settings')))

const SettingsRoutes = [
  {
    path: SETTINGS_PATHS.BASE,
    element: <Settings />,
    permissions: [],
    children: [
      { element: <Navigate to={SETTINGS_PATHS.PUBID} />, index: true },
      { element: <PubId />, path: SETTINGS_PATHS.PUBID },
    ],
  },
]

export default SettingsRoutes
