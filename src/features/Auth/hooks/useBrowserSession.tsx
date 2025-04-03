import Session from 'src/features/Auth/models/Session'

export interface BrowserSessionType {
  activeSession: () => Session | null
  hasActiveSession: () => boolean
  persistSession: (session: Session) => void
  clearSession: () => void
}

export default function useBrowserSession(identifierKey = 'session'): BrowserSessionType {
  const hasActiveSession = (): boolean => {
    return !!localStorage.getItem(identifierKey)
  }

  const activeSession = (): Session | null => {
    const storedSession = localStorage.getItem(identifierKey)
    if (storedSession) {
      try {
        return Session.fromBrowser(JSON.parse(storedSession))
      } catch (error) {
        console.error('Error parsing session from localStorage:', error)
      }
    }
    return null
  }

  const persistSession = (session: Session): void => {
    localStorage.setItem(identifierKey, JSON.stringify(session.asJson))
  }

  const clearSession = (): void => {
    localStorage.removeItem(identifierKey)
  }

  return { activeSession, hasActiveSession, persistSession, clearSession }
}
