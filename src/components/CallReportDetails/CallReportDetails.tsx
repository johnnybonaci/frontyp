import { type SyntheticEvent, type FC, useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { AudiotrackOutlined, ChatBubbleOutline, EditNoteOutlined } from '@mui/icons-material'
import { type CallReportItem } from 'features/CallReport/types'
import styles from './callReportDetails.module.scss'
import Analysis from 'components/CallReportDetails/Analysis/Analysis.tsx'
import Transcript from 'components/CallReportDetails/Transcript'
import Chat from 'components/CallReportDetails/Chat'
import { useTranslation } from 'react-i18next'

interface CallReportDetailsProps {
  callReportItem?: CallReportItem
}

const CallReportDetails: FC<CallReportDetailsProps> = ({ callReportItem }) => {
  const { t } = useTranslation('features', { keyPrefix: 'CallReport.details' })
  const [selectedTab, setSelectedTab] = useState<'ANALYSIS' | 'TRANSCRIPT' | 'CHAT'>('ANALYSIS')

  const handleChange = (
    _event: SyntheticEvent,
    newValue: 'ANALYSIS' | 'TRANSCRIPT' | 'CHAT'
  ): void => {
    setSelectedTab(newValue)
  }

  if (!callReportItem) {
    return null
  }

  return (
    <div className={styles.mainContainer}>
      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab
          icon={<EditNoteOutlined />}
          label={t('analysis')}
          value="ANALYSIS"
          iconPosition="start"
        />
        <Tab
          icon={<AudiotrackOutlined />}
          label={t('audioAndTranscript')}
          value="TRANSCRIPT"
          iconPosition="start"
        />
        <Tab icon={<ChatBubbleOutline />} label={t('chat')} value="CHAT" iconPosition="start" />
      </Tabs>
      <div className={styles.content}>
        {selectedTab === 'ANALYSIS' && <Analysis callReportItem={callReportItem} />}
        {selectedTab === 'TRANSCRIPT' && <Transcript callReportItem={callReportItem} />}
        {selectedTab === 'CHAT' && <Chat callReportItem={callReportItem} />}
      </div>
    </div>
  )
}

export default CallReportDetails
