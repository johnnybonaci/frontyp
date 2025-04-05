import { type FC, memo, useCallback } from 'react'
import { type HeaderProps } from 'components/PrivateLayout/types'
import NavHeader from 'components/NavHeader'
import Notifications from 'components/AuthorizedHeader/components/Notifications.tsx'
import useScreen from 'hooks/useScreen.ts'
import { Button } from '@mui/material'
import styles from './authorizedHeader.module.scss'
import AutorenewIcon from '@mui/icons-material/Autorenew'

const AuthorizedHeader: FC<HeaderProps> = ({
  handleClickMenu,
  collapsedSideBar = false,
  updateAvailable,
  refreshApp,
}) => {
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
      <div className={styles.actionsHeader}>
        {updateAvailable && refreshApp && (
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={refreshApp}
            startIcon={<AutorenewIcon className={styles.spin} />}
          >
            Refrescar versión
          </Button>

        )}
        <Notifications />
      </div>
    </div>
  )
}

export default memo(AuthorizedHeader)
