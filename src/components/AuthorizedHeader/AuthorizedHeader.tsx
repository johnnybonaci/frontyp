import { type FC, memo, useCallback } from 'react'
import { type HeaderProps } from 'components/PrivateLayout/types'
import NavHeader from 'components/NavHeader'
import Notifications from 'components/AuthorizedHeader/components/Notifications.tsx'
import useScreen from 'hooks/useScreen.ts'
import styles from './authorizedHeader.module.scss'

const AuthorizedHeader: FC<HeaderProps> = ({ handleClickMenu, collapsedSideBar = false }) => {
  const { screenTitle } = useScreen()

  const handleMenuClick = useCallback(() => {
    handleClickMenu()
  }, [handleClickMenu])

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentContainer}>
        {collapsedSideBar && <NavHeader handleClickMenu={handleMenuClick} />}
        {screenTitle && <div className={styles.screenTitle}>{screenTitle}</div>}
      </div>
      <div className={styles.actions}>
        <Notifications />
      </div>
    </div>
  )
}

export default memo(AuthorizedHeader)
