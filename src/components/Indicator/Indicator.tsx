import { type FC } from 'react'
import styles from './indicator.module.scss'
import { Grow, Skeleton, Stack, Typography } from '@mui/material'
import GrowthIndicator from 'src/components/GrowthIndicator'
import { type DoubleIndicatorSettings, type IndicatorSettings } from 'hooks/useTableSettings.tsx'
import { DOUBLE_INDICATOR } from 'utils/constants'

export interface IndicatorProps {
  indicator: IndicatorSettings | DoubleIndicatorSettings
  loading?: boolean
}

const Indicator: FC<IndicatorProps> = ({ indicator, loading }) => {
  const { growthPercentage } = indicator

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

  if (indicator.type === DOUBLE_INDICATOR) {
    const { name, values } = indicator as DoubleIndicatorSettings

    return (
      <Grow in>
        <div className={styles.indicator}>
          <Stack alignItems="center">
            <Typography fontSize={14}>{name}</Typography>
            <Stack direction="row" width="100%" justifyContent="space-around">
              <Stack alignItems="center">
                <Typography fontSize={14}>{values[0].name}</Typography>
                <Typography fontSize={20} variant="caption">
                  {values[0].value}
                </Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography fontSize={14}>{values[1].name}</Typography>
                <Typography fontSize={20} variant="caption">
                  {values[1].value}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </Grow>
    )
  }

  const { name, value } = indicator as IndicatorSettings

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
