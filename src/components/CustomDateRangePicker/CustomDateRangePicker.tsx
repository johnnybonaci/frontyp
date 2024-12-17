import React, { useEffect, useRef, useState } from 'react'
import DateRangePicker from 'react-datepicker'
import { TextField, FormControl, FormHelperText, FormLabel } from '@mui/material'
import CalendarWithShortcuts from './CalendarWithShortcuts'

import { type DateRange } from './types'
import { DATE_OPTIONS } from './constants'

import 'react-datepicker/dist/react-datepicker.css'
import './dateRangePicker.module.scss'

interface DateRangePickerProps {
  label: string
  value: DateRange
  onChange: (dates: any[]) => void
  error?: string
  withShortcuts?: boolean
}

const CustomDateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  value,
  onChange,
  error,
  withShortcuts = false,
}) => {
  const [startDate, setStartDate] = useState(value[0])
  const [endDate, setEndDate] = useState(value[1])
  const ref = useRef<(m: number) => void>()

  const changeSelectedValues = (e: any) => {
    setStartDate(e[0])
    setEndDate(e[1])
  }

  useEffect(() => {
    if (endDate) onChange([startDate, endDate])
  }, [startDate, endDate])

  const onClickShorcuts = (shorcutRange: DateRange) => {
    changeSelectedValues(shorcutRange)
    if (shorcutRange[0]) ref.current?.(shorcutRange[0]?.getMonth())
  }

  return (
    <FormControl error={Boolean(error)}>
      <FormLabel sx={{ left: '-30px !important' }}>{label}</FormLabel>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        selectsRange
        onChange={changeSelectedValues}
        customInput={<TextField />}
        monthsShown={2}
        popperPlacement="top-end"
        renderCustomHeader={({
          monthDate,
          changeMonth,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => {
          if (ref)
            ref.current = (month: number) => {
              changeMonth(month)
            }

          return (
            <div style={{ height: '28px' }}>
              <button
                aria-label="Previous Month"
                className={'react-datepicker__navigation react-datepicker__navigation--previous'}
                style={customHeaderCount === 1 ? { visibility: 'hidden' } : undefined}
                onClick={decreaseMonth}
              >
                <span
                  className={
                    'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                  }
                >
                  {'<'}
                </span>
              </button>
              <span className="react-datepicker__current-month">
                {monthDate.toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <button
                aria-label="Next Month"
                className={'react-datepicker__navigation react-datepicker__navigation--next'}
                style={customHeaderCount === 0 ? { visibility: 'hidden' } : undefined}
                onClick={increaseMonth}
              >
                <span
                  className={
                    'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                  }
                >
                  {'>'}
                </span>
              </button>
            </div>
          )
        }}
        showMonthDropdown
        calendarContainer={({ children }) =>
          withShortcuts ? (
            <CalendarWithShortcuts
              onChange={onClickShorcuts}
              value={[startDate, endDate]}
              options={DATE_OPTIONS}
            >
              {children}
            </CalendarWithShortcuts>
          ) : (
            children
          )
        }
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default CustomDateRangePicker
