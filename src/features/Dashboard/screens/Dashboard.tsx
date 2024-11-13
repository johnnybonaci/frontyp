import { type ReactNode, useEffect } from 'react'
import styles from './dashboard.module.scss'
import { useNavigate } from 'react-router-dom'
import { LIVE_LEADS_PATHS } from 'features/LiveLeads/routes.tsx'

const Dashboard = (): ReactNode => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(LIVE_LEADS_PATHS.LIST)
  }, [])

  return <div className={styles.wrapper}></div>
}

export default Dashboard
