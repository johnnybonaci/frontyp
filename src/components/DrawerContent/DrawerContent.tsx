import React from 'react'
import styles from './drawerContent.module.scss'
import { type DrawerContentProps } from './types'

const DrawerContent: React.FC<DrawerContentProps> = ({ children }) => {
  return <main className={styles.modalContent}>{children}</main>
}

export default DrawerContent
