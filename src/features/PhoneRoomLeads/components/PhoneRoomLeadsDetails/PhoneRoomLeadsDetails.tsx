import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Drawer } from '@mui/material'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'

import styles from './phoneRoomLeadsDetails.module.scss'
import { type PhoneRoomLeadsItem } from 'features/PhoneRoomLeads/types'

interface PhoneRoomLeadsDetailsProps {
  open: boolean
  onClose: () => void
  phoneRoomLeadsItem?: PhoneRoomLeadsItem
}

function PhoneRoomLeadsDetails({
  open,
  onClose,
  phoneRoomLeadsItem,
}: PhoneRoomLeadsDetailsProps): ReactNode {
  const { t } = useTranslation('features', { keyPrefix: 'PhoneRoomLeads' })

  if (!phoneRoomLeadsItem) {
    return null
  }

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <DrawerHeader title={t('details.title')} onClose={onClose} />
      <DrawerContent>
        <div className={styles.detailsContainer}>
          <div className={styles.item}>
            <div className={styles.itemLabel}>{t('fields.logs')}</div>
            <div className={styles.itemValue}>{phoneRoomLeadsItem?.log ?? '-'}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemLabel}>{t('fields.request')}</div>
            <div className={styles.itemValue}>{phoneRoomLeadsItem?.request ?? '-'}</div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default PhoneRoomLeadsDetails
