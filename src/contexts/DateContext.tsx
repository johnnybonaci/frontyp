// contexts/DateContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react'
import currentDate, { initCurrentDate } from 'utils/currentDate'

interface DateContextType {
    currentDate: Date
    setCurrentDate: (date: Date) => void
}

const DateContext = createContext<DateContextType | undefined>(undefined)

const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentDateState, setCurrentDateState] = useState(() => {
        return currentDate()
    })

    useEffect(() => {
        initCurrentDate((updatedDate) => {
            setCurrentDateState(updatedDate)
        })
    }, [])

    useEffect(() => {
        localStorage.setItem('currentDate', currentDateState.toISOString())
    }, [currentDateState])

    return (
        <DateContext.Provider value={{ currentDate: currentDateState, setCurrentDate: setCurrentDateState }}>
            {children}
        </DateContext.Provider>
    )
}

export { DateContext, DateProvider }