import { type FC } from 'react'
import { type SidebarProps } from 'components/PrivateLayout/types'
import useAuth from 'src/features/Auth/hooks/useAuth.ts'
import UserCard from 'components/UserCard'
import styles from './authorizedNavBar.module.scss'
import NavSection from 'components/NavSection'
import { Drawer } from '@mui/material'
import NavHeader from 'components/NavHeader'
import Gated from 'components/Gated'

const AuthorizedNavBar: FC<SidebarProps> = ({
  collapsed = false,
  sidebarComponents = [],
  handleClickMenu,
}) => {
  const { session } = useAuth()
  const { user } = session ?? {}

  return (
    <Drawer
      open={!collapsed}
      onClose={handleClickMenu}
      variant="persistent"
      sx={{ width: !collapsed ? 'var(--sidebar-width)' : '0' }}
    >
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <NavHeader handleClickMenu={handleClickMenu} />
        </div>
        <div className={styles.navContainer}>
          {sidebarComponents.map((navSection, i) => (
            <Gated key={`navSection_${navSection.title}_${i}`} permissions={navSection.permission}>
              <NavSection navSection={navSection} />
            </Gated>
          ))}
        </div>
        <div className={styles.bottomSection}>
          <UserCard name={user?.name} email={user?.email} />
        </div>
      </div>
    </Drawer>
  )
}

export default AuthorizedNavBar
