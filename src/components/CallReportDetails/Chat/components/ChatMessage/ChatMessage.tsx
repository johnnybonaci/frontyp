import { Suspense, lazy, type ReactElement } from 'react'
import c from 'classnames'
import { BOT_AVATAR, USER_AVATAR } from '../../constants'
import { type Message } from 'components/CallReportDetails/Chat/useChat.tsx'
import styles from './chatMessage.module.scss'

const MessageRow = lazy(async () => await import('../MessageRow'))
export interface ChatMessageProps {
  message: Message
  isLoading?: boolean
}

const ChatMessage = ({ message, isLoading }: ChatMessageProps): ReactElement => {
  const { isUserMessage } = message.sender

  return (
    <>
      <Suspense>
        <MessageRow
          isSender={isUserMessage}
          avatar={isUserMessage ? USER_AVATAR : BOT_AVATAR}
          isLoading={isLoading}
        >
          <div className={c(styles.message, message.sender.isBotMessage && styles.botMessage)}>
            {message.content}
          </div>
        </MessageRow>
      </Suspense>
    </>
  )
}

export default ChatMessage
