import c from 'classnames'
import styles from './variation.module.scss'
import { type FC } from 'react'

interface CPAVariationProps {
  variation: string
}

const CPAVariation: FC<CPAVariationProps> = ({ variation }) => {
  const getBadgeClassName = (type: string): string => {
    switch (type) {
      case 'Up':
        return styles.up
      case 'Down':
        return styles.down
      case 'Same':
        return styles.same
      default:
        return styles.default
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={c(styles.wrapper, getBadgeClassName(variation))}>
        <span>{variation}</span>
      </div>
    </div>
  )
}

export default CPAVariation
