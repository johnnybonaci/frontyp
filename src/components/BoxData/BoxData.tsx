import { type FC } from 'react'
import c from 'classnames'
import styles from './boxData.module.scss'
import { SvgIcon } from '@mui/material'
import { type BoxDataProps } from 'components/BoxData/types'

const BoxData: FC<BoxDataProps> = ({ label, Icon, value, small = false }) => {
  return (
    <div className={c(styles.mainContainer, small && styles.small)}>
      <div className={styles.icon}>
        <SvgIcon fontSize="inherit">
          <Icon />
        </SvgIcon>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}

export default BoxData
