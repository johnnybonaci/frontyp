import c from 'classnames'
import styles from './callStatus.module.scss'

interface CallStatusProps {
  status: string
}

const CallStatus: React.FC<CallStatusProps> = ({ status }) => {
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

  return (
    <div className={c(styles.wrapper, getStatusClassName(status))}>
      <div className={styles.indicator} />
      {status}
    </div>
  )
}

export default CallStatus
