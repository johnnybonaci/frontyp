import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Drawer } from '@mui/material'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'

import styles from './cpcReportDetails.module.scss'
import { type CPCReportItem } from 'features/CPCReport/types'

interface CPCReportDetailsProps {
  open: boolean
  onClose: () => void
  cpcReport?: CPCReportItem
}

function CPCReportDetails({ open, onClose, cpcReport }: CPCReportDetailsProps): ReactNode {
  const { t } = useTranslation('features', { keyPrefix: 'CPCReport' })

  if (!cpcReport) {
    return null
  }

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <DrawerHeader title={t('details.title')} onClose={onClose} />
      <DrawerContent>
        <div className={styles.detailsContainer}>
          <div className={styles.item}>
            <div className={styles.itemLabel}>{t('fields.url')}</div>
            <div className={styles.itemValue}>{cpcReport?.url ?? '-'}</div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default CPCReportDetails
