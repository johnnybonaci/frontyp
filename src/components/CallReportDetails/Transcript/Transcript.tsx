import { type CallReportItem } from 'features/CallReport/types'
import styles from './transcript.module.scss'
import { type FC } from 'react'
import { useTranslation } from 'react-i18next'

const Transcript: FC<{ callReportItem: CallReportItem }> = ({ callReportItem }) => {
  const { t } = useTranslation('features', { keyPrefix: 'CallReport.details' })

  if (!callReportItem.url) {
    return null
  }

  return (
    <div>
      <audio className={styles.audio} controls src={callReportItem?.url} />
      <div className={styles.title}>{t('transcript')}</div>
      <div className={styles.transcriptContent}>{callReportItem.transcript}</div>
    </div>
  )
}

export default Transcript
