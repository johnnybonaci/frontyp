import { createContext, useState, useEffect, ReactNode } from 'react'
import moment from 'moment-timezone'
import { DEFAULT_DATE_TIMEZONE } from 'utils/constants'

interface DateContextType {
    currentDate: Date
    setCurrentDate: (date: Date) => void
}

const DateContext = createContext<DateContextType | undefined>(undefined)

const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentDate, setCurrentDate] = useState(() => {
        const savedDate = localStorage.getItem('currentDate')
        return savedDate ? new Date(savedDate) : moment.tz(DEFAULT_DATE_TIMEZONE).toDate()
    })

    useEffect(() => {
        const saved = localStorage.getItem('currentDate')
        if (!saved || saved !== currentDate.toISOString()) {
            localStorage.setItem('currentDate', currentDate.toISOString())
        }
    }, [currentDate])

    useEffect(() => {
        const now = moment.tz(DEFAULT_DATE_TIMEZONE)
        const nextDay = now.clone().add(1, 'day').startOf('day')
        const msUntilNextDay = nextDay.diff(now)

        const timer = setTimeout(() => {
            const newDate = moment.tz(DEFAULT_DATE_TIMEZONE).toDate()
            setCurrentDate(newDate)
        }, msUntilNextDay)

        return () => clearTimeout(timer)
    }, [currentDate])

    return (
        <DateContext.Provider value={{ currentDate, setCurrentDate }}>
            {children}
        </DateContext.Provider>
    )
}

export { DateContext, DateProvider }
