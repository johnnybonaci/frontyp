import { type FC } from 'react'
import { type InventoryItemProps } from 'components/InventoryItem/types'
import styles from './inventoryItem.module.scss'
import { useTranslation } from 'react-i18next'

const InventoryItem: FC<InventoryItemProps> = ({ inventoryItem }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.mainContainer}>
      <div className={styles.name}>{inventoryItem.product.name}</div>
      <div className={styles.kpis}>
        <div className={styles.item}>
          <div className={styles.value}>{inventoryItem.quantity}</div>
          <div className={styles.label}>{t('stock.initialQuantity')}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.value}>{inventoryItem.remainders}</div>
          <div className={styles.label}>{t('stock.remainders')}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.value}>{inventoryItem.quantity - inventoryItem.remainders}</div>
          <div className={styles.label}>{t('stock.sold')}</div>
        </div>
      </div>
    </div>
  )
}

export default InventoryItem
