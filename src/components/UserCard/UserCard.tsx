import { type FC } from 'react'
import placeholder from './placeholderImage.jpg'
import { type UserCardProps } from './types'
import styles from './userCard.module.scss'
import { useTranslation } from 'react-i18next'
import { Link } from '@mui/material'

const UserCard: FC<UserCardProps> = ({ name, image }) => {
  const { t } = useTranslation('menu')
  return (
    <div className={styles.authUserContainer}>
      <img src={image ?? placeholder} alt={name} className={styles.avatar} />
      <div className={styles.userInformation}>
        <p className={styles.name}>{name}</p>
        <Link href={'/auth/logout'} className={styles.logout}>
          {t('logout')}
        </Link>
      </div>
    </div>
  )
}

export default UserCard
