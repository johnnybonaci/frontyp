import c from 'classnames'
import styles from './callStatus.module.scss'
import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface CallStatusProps {
  status: string
  billable: number | null
}

const CallStatus: FC<CallStatusProps> = ({ status, billable }) => {
  const { t } = useTranslation('features', { keyPrefix: 'CallReport' })
  const getStatusClassName = (status: string): any => {
    switch (status) {
      case 'Contact':
        return styles.contact
      case 'Billable':
        return styles.billable
      case 'Sale':
        return styles.sale
      case 'Sale to Review':
        return styles.saleToReview
      case 'Failed':
        return styles.failed
      case 'No Contact':
        return styles.noContact
      default:
        return ''
    }
  }

  const getBillable = (billable: number | null): any => {
    switch (billable) {
      case 1:
        return { name: t('sale'), className: styles.sale }
      case 0:
        return { name: t('saleToReview'), className: styles.saleToReview }
      default:
        return null
    }
  }

  const billableIndicator = useMemo(() => getBillable(billable), [billable])

  return (
    <div className={styles.mainContainer}>
      <div className={c(styles.wrapper, getStatusClassName(status))}>
        <div className={styles.indicator} />
        {status}
      </div>
      {billableIndicator && (
        <div className={c(styles.wrapper, billableIndicator.className)}>
          <div className={styles.indicator} />
          {billableIndicator.name}
        </div>
      )}
    </div>
  )
}

export default CallStatus
