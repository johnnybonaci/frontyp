import { useState } from 'react'
import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from '../../../config.tsx'
import { useTranslation } from 'react-i18next'

export enum SenderType {
  Bot = 'Bot',
  User = 'User',
}

export interface Message {
  sender: {
    type: SenderType
    isBotMessage: boolean
    isUserMessage: boolean
  }
  content: string
}

export interface UseChatType {
  messages: Message[]
  sendMessage: (text: string) => Promise<void>
  loading: boolean
  error: RequestError | null
}

export const useChat = ({ callId }: { callId: number }): UseChatType => {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([])
  const { doFetch, error, loading } = useFetch(`${config.api.baseUrl}/data/ask`, {
    method: 'POST',
  })

  const sendMessage = async (text: string): Promise<void> => {
    setMessages((prev) => [
      ...prev,
      {
        sender: {
          type: SenderType.User,
          isBotMessage: false,
          isUserMessage: true,
        },
        content: text,
      },
      {
        sender: {
          type: SenderType.Bot,
          isBotMessage: true,
          isUserMessage: false,
        },
        content: '',
      },
    ])
    try {
      const { data } = await doFetch({ data: { query: text, id: callId } })
      setMessages((prev) =>
        prev.map((item, index) => {
          if (index === prev.length - 1) {
            return {
              ...item,
              content: data.response,
            }
          }
          return item
        })
      )
    } catch (err) {
      setMessages((prev) =>
        prev.map((item, index) => {
          if (index === prev.length - 1) {
            return {
              ...item,
              content: t('genericErrorTryAgainLater'),
            }
          }
          return item
        })
      )
    }
  }

  return {
    messages,
    sendMessage,
    loading,
    error,
  }
}
