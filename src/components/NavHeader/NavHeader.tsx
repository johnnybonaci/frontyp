import { type FC } from 'react'
import { NavLink } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'
import MenuRounded from '@mui/icons-material/MenuRounded'
import logo from 'src/assets/primaryLogo.png'
import { DASHBOARD } from 'utils/constants.ts'
import styles from './navHeaderModule.module.scss'

interface NavHeaderProps {
  handleClickMenu?: () => void
}
const NavHeader: FC<NavHeaderProps> = ({ handleClickMenu }) => {
  return (
    <div className={styles.headerIconsContainer}>
      <div className={styles.menuTrigger}>
        {handleClickMenu && (
          <IconButton onClick={handleClickMenu} color="primary">
            <SvgIcon fontSize="inherit">
              <MenuRounded />
            </SvgIcon>
          </IconButton>
        )}
      </div>
      <NavLink to={DASHBOARD} title="Logo">
        <img src={logo} className={styles.logo} alt="Logo" />
      </NavLink>
    </div>
  )
}

export default NavHeader
