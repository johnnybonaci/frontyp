import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Drawer } from '@mui/material'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'

import styles from './complianceBotDetails.module.scss'
import { type ComplianceBotItem } from 'features/ComplianceBot/types'

interface ComplianceBotDetailsProps {
  open: boolean
  onClose: () => void
  complianceBot?: ComplianceBotItem
}

function ComplianceBotDetails({
  open,
  onClose,
  complianceBot,
}: ComplianceBotDetailsProps): ReactNode {
  const { t } = useTranslation('features', { keyPrefix: 'ComplianceBot' })

  if (!complianceBot) {
    return null
  }

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <DrawerHeader title={t('details.title')} onClose={onClose} />
      <DrawerContent>
        <div className={styles.detailsContainer}>
          <div className={styles.item}>
            <div className={styles.itemLabel}>{t('fields.trustedForm')}</div>
            <div className={styles.itemValue}>{complianceBot?.trustedForm ?? '-'}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemLabel}>{t('fields.ip')}</div>
            <div className={styles.itemValue}>{complianceBot?.ip ?? '-'}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemLabel}>{t('fields.region')}</div>
            <div className={styles.itemValue}>
              {(complianceBot?.region ?? '-') + ' / ' + (complianceBot?.city ?? '-')}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default ComplianceBotDetails
