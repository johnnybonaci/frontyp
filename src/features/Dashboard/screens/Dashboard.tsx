import { type ReactNode, useEffect } from 'react'
import styles from './dashboard.module.scss'
import { useNavigate } from 'react-router-dom'

const Dashboard = (): ReactNode => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/administration')
  }, [])

  return <div className={styles.wrapper}></div>
}

export default Dashboard
