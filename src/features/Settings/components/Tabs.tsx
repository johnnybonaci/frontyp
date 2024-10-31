import React, { useMemo } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { SETTINGS_PATHS } from '../routes'
import { SettingTab } from '../types'

const TABS: SettingTab[] = [
  { label: 'PUB ID', path: SETTINGS_PATHS.PUBID },
  { label: 'OFFER', path: SETTINGS_PATHS.OFFERS },
  { label: 'TRAFFIC SOURCE', path: SETTINGS_PATHS.TRAFFIC_SOURCE },
  { label: 'BUYERS', path: SETTINGS_PATHS.BUYERS },
  { label: 'DID NUMBER', path: SETTINGS_PATHS.DID_NUMBER },
  { label: 'PHONE ROOM', path: SETTINGS_PATHS.PHONE_ROOM },
  { label: 'PROVIDER', path: SETTINGS_PATHS.PROVIDER },
]

const SettingsTabs: React.FC = () => {
  const { pathname } = useLocation()

  // Determine the active tab from the current path
  const activeTabIndex = useMemo(() => {
    const tabIndex = TABS.findIndex((tab) => SETTINGS_PATHS.BASE + '/' + tab.path === pathname)

    return tabIndex !== -1 ? tabIndex : 0
  }, [pathname, TABS])

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Tabs
          value={activeTabIndex}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'uppercase',
              color: '#666',
              '&.Mui-selected': {
                color: '#673ab7',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#673ab7',
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.path} label={tab.label} component={Link} to={tab.path} />
          ))}
        </Tabs>
      </Box>
    </Box>
  )
}

export default SettingsTabs
