import React, { useMemo } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { SETTINGS_PATHS } from '../routes'
import { SettingTab } from '../types'
import { useTranslation } from 'react-i18next'

const TABS: SettingTab[] = [
  { label: 'pub_id', path: SETTINGS_PATHS.PUBID },
  { label: 'offer', path: SETTINGS_PATHS.OFFERS },
  { label: 'traffic_source', path: SETTINGS_PATHS.TRAFFIC_SOURCE },
  { label: 'buyers', path: SETTINGS_PATHS.BUYERS },
  { label: 'did_number', path: SETTINGS_PATHS.DID_NUMBER },
  { label: 'phone_room', path: SETTINGS_PATHS.PHONE_ROOM },
  { label: 'provider', path: SETTINGS_PATHS.PROVIDER },
]

const SettingsTabs: React.FC = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation('features', { keyPrefix: 'Settings.tabs' })

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
            <Tab key={tab.path} label={t(tab.label)} component={Link} to={tab.path} />
          ))}
        </Tabs>
      </Box>
    </Box>
  )
}

export default SettingsTabs
