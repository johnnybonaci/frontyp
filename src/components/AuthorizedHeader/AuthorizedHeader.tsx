import { type FC, memo, useCallback } from 'react'
import { type HeaderProps } from 'components/PrivateLayout/types'
import NavHeader from 'components/NavHeader'
import Notifications from 'components/AuthorizedHeader/components/Notifications.tsx'
import useScreen from 'hooks/useScreen.ts'
import { Box, Link } from '@mui/material'
import styles from './authorizedHeader.module.scss'

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
          <Box>
            New version is available
            <Link
              href="#"
              underline="hover"
              color="inherit"
              onClick={refreshApp}
              sx={{ fontWeight: 'bold', mr: 1 }}
            >
              Update now
            </Link>
          </Box>

        )}
        <Notifications />
      </div>
    </div>
  )
}

export default memo(AuthorizedHeader)
