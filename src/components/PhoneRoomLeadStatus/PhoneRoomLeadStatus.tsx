import c from 'classnames'
import styles from './phoneRoomLeadStatus.module.scss'
import { type FC } from 'react'

interface PhoneRoomLeadStatusProps {
  status: string
}

const PhoneRoomLeadStatus: FC<PhoneRoomLeadStatusProps> = ({ status }) => {
  const getBadgeClassName = (status: string): string => {
    switch (status) {
      case 'sent':
        return styles.sent
      case 'rejected':
        return styles.rejected
      default:
        return styles.default
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={c(styles.wrapper, getBadgeClassName(status))}>
        <div className={styles.indicator} />
        <span>{status}</span>
      </div>
    </div>
  )
}

export default PhoneRoomLeadStatus
