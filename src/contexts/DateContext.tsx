import { createContext, useState, useEffect, ReactNode } from 'react'
import currentDate, {
    initCurrentDate,
    IS_TEST,
    getYesterday,
    saveDate,
} from 'utils/currentDate'

interface DateContextType {
    currentDate: Date
    setCurrentDate: (date: Date) => void
}

const DateContext = createContext<DateContextType | undefined>(undefined)

const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentDateState, setCurrentDateState] = useState(() =>
        IS_TEST ? getYesterday() : currentDate()
    )

    useEffect(() => {
        initCurrentDate((updatedDate) => {
            setCurrentDateState(updatedDate)
        })
    }, [])

    useEffect(() => {
        saveDate(currentDateState)
    }, [currentDateState])

    return (
        <DateContext.Provider
            value={{
                currentDate: currentDateState,
                setCurrentDate: setCurrentDateState,
            }}
        >
            {children}
        </DateContext.Provider>
    )
}

export { DateContext, DateProvider }
