import React, { type ReactNode, useState } from 'react'
import { Drawer } from '@mui/material'

interface DrawerProps {
  children?: ReactNode
  open: boolean
  onClose: () => void
}

interface UseDrawerResult {
  Drawer: React.FC<DrawerProps>
  handleOpen: () => void
  open: boolean
  close: () => void
}

const useDrawer = (drawerProps: any = {}): UseDrawerResult => {
  const [open, setOpen] = useState(false)

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const DrawerComponent: React.FC<DrawerProps> = ({ children, open, onClose }) => {
    return (
      <Drawer anchor="right" variant="persistent" open={open} onClose={onClose} {...drawerProps}>
        {children}
      </Drawer>
    )
  }

  return {
    Drawer: DrawerComponent,
    handleOpen,
    open,
    close: handleClose,
  }
}

export default useDrawer
