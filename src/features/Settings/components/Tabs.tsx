import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { SETTINGS_PATHS } from '../routes'
import { SettingsTabsProps, SettingTab } from '../types'

const SettingsTabs: React.FC<SettingsTabsProps> = ({ onTabChange }) => {
  const [value, setValue] = useState<number>(0)
  const location = useLocation()

  const handleChange = (_event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
    onTabChange?.(newValue)
  }

  const tabs: SettingTab[] = [
    { label: 'PUB ID', path: SETTINGS_PATHS.PUBID },
    { label: 'OFFER', path: SETTINGS_PATHS.OFFERS },
    { label: 'TRAFFIC SOURCE', path: SETTINGS_PATHS.TRAFFIC_SOURCE },
    { label: 'BUYERS', path: SETTINGS_PATHS.BUYERS },
    { label: 'DID NUMBER', path: SETTINGS_PATHS.DID_NUMBER },
    { label: 'PHONE ROOM', path: SETTINGS_PATHS.PHONE_ROOM },
    { label: 'PROVIDER', path: SETTINGS_PATHS.PROVIDER },
  ]

  // Determine the active tab from the current path
  useEffect(() => {
    const tabIndex = tabs.findIndex((tab) => tab.path === location.pathname)
    if (tabIndex !== -1) {
      setValue(tabIndex)
    }
  }, [location.pathname, tabs])

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
          value={value}
          onChange={handleChange}
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
          {tabs.map((tab) => (
            <Tab key={tab.path} label={tab.label} component={Link} to={tab.path} />
          ))}
        </Tabs>
      </Box>
    </Box>
  )
}

export default SettingsTabs
