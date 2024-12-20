import { memo, type FC } from 'react'
import c from 'classnames'
import Gated from 'src/components/Gated'
import styles from './menuButton.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { type MenuButtonProps } from 'components/MenuButton/types/menuButtonTypes'
import { Icon } from '@mui/material'

const OLD_SITE_DOMAIN = import.meta.env.VITE_OLD_SITE_URL

const MenuButton: FC<MenuButtonProps> = ({
  icon,
  label,
  to,
  redirectOutside = false,
  collapsed = false,
  orValidation,
  permissions = 'yes',
}) => {
  const { pathname } = useLocation()

  const isCurrentRoute = pathname.startsWith(to) || pathname.startsWith(`/${to}`)

  return (
    <Gated permissions={permissions} orValidation={orValidation}>
      <NavLink
        className={(navData: any) =>
          c(
            styles.menuButton,
            navData.isActive ? styles.menuButtonActive : 'none',
            collapsed && styles.collapsed
          )
        }
        to={redirectOutside ? OLD_SITE_DOMAIN + to : to}
        onClick={isCurrentRoute ? (e) => e.preventDefault() : undefined}
      >
        <Icon component={icon} className={styles.icon} />
        <span className={styles.label}>{label}</span>
      </NavLink>
    </Gated>
  )
}

export default memo(MenuButton)
