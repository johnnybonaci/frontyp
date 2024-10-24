import { type FC } from 'react'
import styles from './indicator.module.scss'
import { Grow, Skeleton } from '@mui/material'
import GrowthIndicator from 'src/components/GrowthIndicator'
import { type IndicatorSettings } from 'hooks/useTableSettings.tsx'

export interface IndicatorProps {
  indicator: IndicatorSettings
  loading?: boolean
}

const Indicator: FC<IndicatorProps> = ({ indicator, loading }) => {
  const { name, value, growthPercentage } = indicator

  if (loading) {
    return (
      <div className={styles.indicator}>
        <div className={styles.topContainer}>
          <Skeleton variant="text" width={100} />
          <Skeleton variant="text" width={100} />
        </div>
        {!!growthPercentage && <Skeleton variant="text" width={50} />}
      </div>
    )
  }

  return (
    <Grow in>
      <div className={styles.indicator}>
        <div className={styles.topContainer}>
          <span className={styles.name}>{name}</span>
          <span className={styles.value}>{value}</span>
        </div>
        {!!growthPercentage && <GrowthIndicator percentage={growthPercentage} />}
      </div>
    </Grow>
  )
}

export default Indicator
