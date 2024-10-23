import React, { type ReactElement } from 'react'
import styles from './drawerActions.module.scss'

interface HeaderProps {
  actions?: ReactElement
}

const DrawerActions: React.FC<HeaderProps> = ({ actions }) => {
  return <div className={styles.actions}>{actions}</div>
}

export default DrawerActions
