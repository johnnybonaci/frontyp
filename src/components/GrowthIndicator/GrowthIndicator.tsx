import { type FC } from 'react'
import c from 'classnames'
import styles from './growthIndicator.module.scss'
import { formatPercentageIndicator } from 'hooks/indicator.ts'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import { SvgIcon } from '@mui/material'

export interface GrowthIndicatorProps {
  percentage: number
}

const GrowthIndicator: FC<GrowthIndicatorProps> = ({ percentage }) => {
  const color = percentage > 0 ? styles.positive : styles.negative
  const text = formatPercentageIndicator(percentage)
  const Icon = percentage > 0 ? TrendingUpIcon : TrendingDownIcon

  return (
    <div className={c(styles.indicator, color)}>
      <SvgIcon fontSize="inherit">
        <Icon />
      </SvgIcon>
      <span>{text}</span>
    </div>
  )
}

export default GrowthIndicator
