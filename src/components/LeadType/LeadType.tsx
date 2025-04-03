import c from 'classnames'
import styles from './leadType.module.scss'
import { type FC } from 'react'

interface LeadTypeProps {
  type: string
}

const LeadType: FC<LeadTypeProps> = ({ type }) => {
  const getBadgeClassName = (type: string): string => {
    switch (type) {
      case 'ACA':
        return styles.aca
      case 'MC':
        return styles.mc
      case 'legal':
        return styles.legal
      case 'debt':
        return styles.debt
      case 'tax_debt':
        return styles.taxDebt
      default:
        return styles.default
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={c(styles.wrapper, getBadgeClassName(type))}>
        <div className={styles.indicator} />
        <span>{type}</span>
      </div>
    </div>
  )
}

export default LeadType
