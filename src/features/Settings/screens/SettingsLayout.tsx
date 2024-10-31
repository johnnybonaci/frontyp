import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import SettingsTabs from '../components/Tabs'

function SettingsLayout(): ReactNode {
  return (
    <>
      <h1>Settings</h1>
      <SettingsTabs />
      <Outlet />
    </>
  )
}

export default SettingsLayout
