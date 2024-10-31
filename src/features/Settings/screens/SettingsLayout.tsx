import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import SettingsTabs from '../components/Tabs'
import { Container } from '@mui/material'

function SettingsLayout(): ReactNode {
  return (
    <Container maxWidth="xl">
      <SettingsTabs />
      <Outlet />
    </Container>
  )
}

export default SettingsLayout
