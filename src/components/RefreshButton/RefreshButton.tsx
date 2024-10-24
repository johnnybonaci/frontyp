import React from 'react'
import { IconButton } from '@mui/material'
import { RefreshOutlined } from '@mui/icons-material'

interface ExportButtonProps {
  onRefresh: () => void
}

const RefreshButton: React.FC<ExportButtonProps> = ({ onRefresh }) => {
  return (
    <IconButton onClick={onRefresh}>
      <RefreshOutlined />
    </IconButton>
  )
}

export default RefreshButton
