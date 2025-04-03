import { type CallReportItem } from 'features/CallReport/types'
import { TextField, SvgIcon, IconButton } from '@mui/material'
import styles from './chat.module.scss'
import React, { type FC, useEffect, useRef } from 'react'
import { useChat } from 'components/CallReportDetails/Chat/useChat.tsx'
import ChatMessage from 'components/CallReportDetails/Chat/components/ChatMessage'
import { SendRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

const Chat: FC<{ callReportItem: CallReportItem }> = ({ callReportItem }) => {
  const chatRef = useRef(null)
  const { messages, sendMessage, loading } = useChat({ callId: callReportItem.id })
  const { t } = useTranslation('features', { keyPrefix: 'CallReport.details' })

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = formData.get('message') as string
    if (!message.trim()) return
    event.currentTarget.reset()
    void sendMessage(message)
  }

  useEffect(() => {
    if (chatRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      chatRef.current.scrollTo({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        top: chatRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <div className={styles.mainContainer}>
      {messages.length === 0 ? (
        <div className={styles.noMessages}>{t('noMessages')}</div>
      ) : (
        <div className={styles.messages} ref={chatRef}>
          {messages.map((message, index) => (
            <ChatMessage
              key={message.content + index}
              message={message}
              isLoading={(loading && index === messages.length - 1) || !message.content}
            />
          ))}
        </div>
      )}
      <form onSubmit={handleSendMessage} className={styles.actions}>
        <TextField fullWidth variant="outlined" name="message" autoFocus />
        <IconButton type="submit" className={styles.sendButton}>
          <SvgIcon fontSize="inherit">
            <SendRounded />
          </SvgIcon>
        </IconButton>
      </form>
    </div>
  )
}

export default Chat
