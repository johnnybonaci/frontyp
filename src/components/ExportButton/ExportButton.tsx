import React, { useState } from 'react'
import { Button, Drawer, SvgIcon, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'
import DrawerActions from 'components/DrawerActions'
import { FileDownloadOutlined } from '@mui/icons-material'

interface ExportButtonProps {
  onExport: () => void
}

const ExportButton: React.FC<ExportButtonProps> = ({ onExport }) => {
  const { t } = useTranslation()
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleExport = (): void => {
    setOpenDrawer(true)
  }

  const handleConfirm = (): void => {
    onExport()
    setOpenDrawer(false)
  }

  const handleCancel = (): void => {
    setOpenDrawer(false)
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleExport}
        startIcon={
          <SvgIcon>
            <FileDownloadOutlined />
          </SvgIcon>
        }
        sx={{
          minHeight: '28px !important',
          height: '28px !important',
          maxHeight: '28px !important',
          minWidth: '100px !important',
          width: '100px !important',
          maxWidth: '100px !important',
        }}
      >
        {t('export')}
      </Button>
      <Drawer open={openDrawer} onClose={handleCancel} anchor="right">
        <DrawerHeader onClose={handleCancel} title={t('exportConfirmationTitle')} />
        <DrawerContent>
          <Typography>{t('exportConfirmationMessage')}</Typography>
          <DrawerActions
            actions={
              <>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                  {t('noCancel')}
                </Button>
                <Button variant="contained" color="primary" onClick={handleConfirm}>
                  {t('yesExport')}
                </Button>
              </>
            }
          />
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default ExportButton
