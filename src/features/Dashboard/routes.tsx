import { lazy } from 'react'

// project imports

// dashboard routing
const Dashboard = lazy(async () => await import('src/features/Dashboard/screens/Dashboard.tsx'))

const DashboardRoutes = {
  path: '',
  element: <Dashboard />,
}

export default DashboardRoutes
