import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Drawer } from '@mui/material'
import DrawerHeader from 'components/DrawerHeader'
import DrawerContent from 'components/DrawerContent'

import styles from './phoneRoomConfig.module.scss'
import { type PhoneRoomItem } from 'features/Settings/types/PhoneRoom'

interface PhoneRoomConfigDetailsProps {
  open: boolean
  onClose: () => void
  phoneRoom?: PhoneRoomItem
}

function PhoneRoomConfigDetails({
  open,
  onClose,
  phoneRoom,
}: PhoneRoomConfigDetailsProps): ReactNode {
  const { t } = useTranslation('features', { keyPrefix: 'Settings.phoneRoom' })

  if (!phoneRoom) {
    return null
  }

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <DrawerHeader title={t('details.title')} onClose={onClose} />
      <DrawerContent>
        <div className={styles.detailsContainer}>
          <div className={styles.item}>
            <div className={styles.itemLabel}>{t('fields.envKey')}</div>
            <div className={styles.itemValue}>{phoneRoom?.envKey ?? '-'}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemLabel}>{t('fields.envUser')}</div>
            <div className={styles.itemValue}>{phoneRoom?.envUser ?? '-'}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemLabel}>{t('fields.listId')}</div>
            <div className={styles.itemValue}>{phoneRoom?.listId ?? '-'}</div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default PhoneRoomConfigDetails
