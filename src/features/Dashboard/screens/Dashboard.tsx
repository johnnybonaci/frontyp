import { type ReactNode, useEffect } from 'react'
import styles from './dashboard.module.scss'
import { useNavigate } from 'react-router-dom'
import config from 'src/config.tsx';

const Dashboard = (): ReactNode => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(config.site)
  }, [])

  return <div className={styles.wrapper}></div>
}

export default Dashboard
