import c from 'classnames'
import styles from './transcriptStatus.module.scss'
import { type FC } from 'react'
import { type StatusT } from 'features/CallReport/types'
import { useTranslation } from 'react-i18next'

interface TranscriptStatusProps {
  status: StatusT
}

const TranscriptStatus: FC<TranscriptStatusProps> = ({ status }) => {
  const { t } = useTranslation('features', { keyPrefix: 'CallReport.transcriptStatuses' })

  const getStatusClassName = (status: StatusT): any => {
    switch (status.value) {
      case 1:
        return styles.processed
      case 2:
        return styles.availableToDownload
      case 3:
        return styles.transcribing
      case 4:
        return styles.failed
      default:
        return ''
    }
  }

  return (
    <div className={c(styles.wrapper, getStatusClassName(status))}>
      <div className={styles.indicator} />
      {t(status.value.toString())}
    </div>
  )
}

export default TranscriptStatus
