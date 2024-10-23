import React, { type ReactElement } from 'react'
import { IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import styles from './drawerHeader.module.scss'

interface HeaderProps {
  onClose: () => void
  title: string
  actions?: ReactElement
}

const DrawerHeader: React.FC<HeaderProps> = ({ onClose, title, actions }) => {
  return (
    <header className={styles.modalHeader}>
      <Typography variant="h1">{title}</Typography>
      <div className={styles.rightContent}>
        {actions}
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
    </header>
  )
}

export default DrawerHeader
