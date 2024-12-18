import React from 'react'
import styles from './phoneRoomReportsUpdated.module.scss'
import dateFormat from 'utils/dateFormat.ts'

interface PhoneRoomReportsUpdatedProps {
  created: string
  updated: string
}

const PhoneRoomReportsUpdated: React.FC<PhoneRoomReportsUpdatedProps> = ({ created, updated }) => {
  const isUpdated = updated !== created

  return (
    <span className={`${styles.cell} ${isUpdated ? styles.updated : styles.notUpdated}`}>
      <svg
        className={`${styles.icon} ${isUpdated ? styles.updatedIcon : styles.notUpdatedIcon}`}
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx="3" cy="3" r="3" />
      </svg>
      {dateFormat(updated, 'YYYY-MM-DD HH:mm:ss')}
    </span>
  )
}

export default PhoneRoomReportsUpdated
