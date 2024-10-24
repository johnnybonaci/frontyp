import React from 'react'
import styles from './accountCard.module.scss'
import avatarIcon from './placeholderImage.jpg'

interface AccountCardProps {
  account: string
  name: string
  email: string
  typeOut: string
  vendor: string
  phone: string
}

const AccountCard: React.FC<AccountCardProps> = ({
  account,
  name,
  email,
  typeOut,
  vendor,
  phone,
}) => {
  if (!account || !name || !email || !typeOut || !vendor || !phone) {
    return null
  }

  return (
    <div className={styles.accountCard}>
      <img src={avatarIcon} alt="Avatar" className={styles.avatar} />
      <div className={styles.userInfo}>
        <p className={styles.name}>{name}</p>
        <p className={styles.email}>{email}</p>
        <div className={styles.details}>
          <span>{typeOut}</span>
          <span>{vendor}</span>
        </div>
      </div>
    </div>
  )
}

export default AccountCard
