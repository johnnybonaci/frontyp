import { type ReactNode, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import ScreenContext from './ScreenContext.ts'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export interface ScreenType {
  screenTitle?: string
  changeTitle: (title: string) => void
}

interface ScreenProviderProps {
  children: ReactNode
}

const ScreenProvider = ({ children }: ScreenProviderProps): ReactNode => {
  const { t } = useTranslation()
  const [screenTitle, setScreenTitle] = useState<string | undefined>(undefined)
  const location = useLocation()

  const changeTitle = (title: string): void => {
    setScreenTitle(title)
  }

  useEffect(() => {
    setScreenTitle(undefined)
  }, [location])

  return (
    <ScreenContext.Provider
      value={{
        screenTitle,
        changeTitle,
      }}
    >
      <Helmet>
        <title>
          {screenTitle ? `${screenTitle} | ` : ''}
          {t('projectName')}
        </title>
      </Helmet>
      {children}
    </ScreenContext.Provider>
  )
}

export default ScreenProvider
