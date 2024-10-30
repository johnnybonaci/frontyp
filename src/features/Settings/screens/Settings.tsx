import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

function Settings(): ReactNode {
  return (
    <>
      <h1>Settings</h1>
      <Outlet />
    </>
  )
}

export default Settings
