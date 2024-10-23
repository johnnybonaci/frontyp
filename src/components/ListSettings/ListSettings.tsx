import React, { useState, useCallback } from 'react'
import { IconButton, Drawer, SvgIcon, Button } from '@mui/material'
import { DeleteOutlined, Settings } from '@mui/icons-material'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'
import styles from './listSettings.module.scss'
import ReorderableList from 'components/ReorderableList'
import { type ColumnSettings, type IndicatorSettings } from 'hooks/useTableSettings.tsx'

type Item = ColumnSettings | IndicatorSettings

interface ListSettingsProps {
  columns: Item[]
  unselectedColumns: Item[]
  onReorderColumns: (startIndex: number, endIndex: number) => void
  onToggleColumn: (fieldName: string) => void
  indicators: Item[]
  resetToDefaultSettings: () => void
  unselectedIndicators: Item[]
  onReorderIndicators: (startIndex: number, endIndex: number) => void
  onToggleIndicator: (indicatorName: string) => void
}

const ListSettings: React.FC<ListSettingsProps> = ({
  columns,
  unselectedColumns,
  onReorderColumns,
  onToggleColumn,
  indicators,
  unselectedIndicators,
  onReorderIndicators,
  onToggleIndicator,
  resetToDefaultSettings,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Toggle drawer visibility
  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prevOpen) => !prevOpen)
  }, [])

  return (
    <>
      <IconButton onClick={toggleDrawer}>
        <Settings />
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer} anchor="right">
        <DrawerHeader
          title="Settings"
          onClose={toggleDrawer}
          actions={
            <Button
              startIcon={
                <SvgIcon fontSize="inherit">
                  <DeleteOutlined />
                </SvgIcon>
              }
              variant="outlined"
              sx={{ maxWidth: '100px', maxHeight: '40px' }}
              onClick={resetToDefaultSettings}
              title="Reset to default"
            >
              Reset to default
            </Button>
          }
        />
        <DrawerContent>
          <div className={styles.listSettings}>
            <div>
              <div className={styles.listTitle}>Indicators</div>
              <ReorderableList
                items={indicators}
                unselectedItems={unselectedIndicators}
                toggleVisibility={(ind) => {
                  onToggleIndicator(ind.name)
                }}
                reorderItems={onReorderIndicators}
              />
            </div>
            <div>
              <div className={styles.listTitle}>Columns</div>
              <ReorderableList
                items={columns}
                unselectedItems={unselectedColumns}
                toggleVisibility={(col) => {
                  onToggleColumn(col.fieldName)
                }}
                reorderItems={onReorderColumns}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ListSettings
